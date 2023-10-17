import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
  W3mButton,
} from '@web3modal/wagmi-react-native';
import {FlexView, Text} from '@web3modal/ui-react-native';
import {WagmiConfig} from 'wagmi';
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  // sepolia,
  // goerli,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';
import {ENV_PROJECT_ID} from '@env';
import {SignMessage} from './views/SignMessage';
import {SendTransaction} from './views/SendTransaction';
import {ReadContract} from './views/ReadContract';
import {useCheckToken} from './useCheckToken';

// 1. Get projectId
const projectId = ENV_PROJECT_ID;

const chains = [arbitrum, bsc, mainnet, polygon];

// 2. Create config
const metadata = {
  name: 'Web3Modal + wagmi',
  description: 'Web3Modal + wagmi',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'w3mwagmisample://',
  },
};

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <WagmiConfig config={wagmiConfig}>
      <Wrapper>
        <SafeAreaView style={[styles.container, isDarkMode && styles.dark]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Text style={styles.title} variant="large-700">
            Web3Modal + wagmi
          </Text>
          <FlexView gap="xs">
            <W3mButton balance="show" />
            <SignMessage />
            <SendTransaction />
            <ReadContract />
          </FlexView>
          <Web3Modal />
        </SafeAreaView>
      </Wrapper>
    </WagmiConfig>
  );
}

const Wrapper = ({children}) => {
  useCheckToken();

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dark: {
    backgroundColor: '#141414',
  },
  title: {
    marginBottom: 40,
    fontSize: 30,
  },
});

export default App;
