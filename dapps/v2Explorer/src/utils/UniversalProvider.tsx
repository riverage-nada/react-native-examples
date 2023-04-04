import '@walletconnect/react-native-compat';
import UniversalProvider from '@walletconnect/universal-provider';

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import {ENV_PROJECT_ID, ENV_RELAY_URL} from '@env';
import {SessionTypes} from '@walletconnect/types';
import {ethers} from 'ethers';
import {Alert} from 'react-native';
import {verifyMessage} from 'ethers/lib/utils';
import {utf8ToHex} from '@walletconnect/encoding';

export let universalProvider: UniversalProvider;
export let web3Provider: ethers.providers.Web3Provider | undefined;
export let universalProviderSession: SessionTypes.Struct | undefined;

export async function createUniversalProvider() {
  // console.log('[CONFIG] ENV_PROJECT_ID:', ENV_PROJECT_ID);
  // console.log('[CONFIG] ENV_RELAY_URL:', ENV_RELAY_URL);

  try {
    universalProvider = await UniversalProvider.init({
      logger: 'info',
      relayUrl: ENV_RELAY_URL,
      projectId: ENV_PROJECT_ID,
      metadata: {
        name: 'React Native V2 dApp',
        description: 'RN dApp by WalletConnect',
        url: 'https://walletconnect.com/',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
      },
    });
  } catch {
    Alert.alert('Error', 'Error connecting to WalletConnect');
  }
}

export function clearSession() {
  universalProviderSession = undefined;
  web3Provider = undefined;
}

export async function createUniversalProviderSession(callbacks?: {
  onSuccess?: () => void;
  onFailure?: (error: any) => void;
}) {
  try {
    universalProviderSession = await universalProvider.connect({
      namespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:1'],
          events: ['chainChanged', 'accountsChanged'],
          rpcMap: {},
        },
      },
    });
    web3Provider = new ethers.providers.Web3Provider(universalProvider);
    callbacks?.onSuccess?.();
  } catch (error) {
    callbacks?.onFailure?.(error);
  }
}

export function verifyEip155MessageSignature(
  message: string,
  signature: string,
  address: string,
) {
  verifyMessage(message, signature).toLowerCase() === address.toLowerCase();
}

export const testSignMessage: () => Promise<any> = async () => {
  if (!web3Provider) {
    throw new Error('web3Provider not connected');
  }
  const msg = 'Hello World';
  const hexMsg = utf8ToHex(msg, true);
  const [address] = await web3Provider.listAccounts();
  const signature = await web3Provider.send('personal_sign', [hexMsg, address]);
  const valid = verifyEip155MessageSignature(msg, signature, address);
  return {
    method: 'personal_sign',
    address,
    valid,
    result: signature,
  };
};
