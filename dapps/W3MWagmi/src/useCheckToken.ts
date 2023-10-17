// checkBuild("条件分岐変更");
import {useEffect, useState} from 'react';
import {useAccount, useDisconnect} from 'wagmi';
import {useContractBalances} from './useContractBalances';
import {Alert} from 'react-native';
import {fetcher} from './functions';

export const useCheckToken = () => {
  const {address, isConnected, status} = useAccount();
  const {disconnect} = useDisconnect();
  const [targetContracts, settargetContracts] = useState([]);
  const {contracts} = useContractBalances(targetContracts);

  useEffect(() => {
    fetcher(process.env.NEXT_PUBLIC_GET_CONTRACT_ENDPOINT, {})
      .then(res => {
        return res.json();
      })
      .then(res => {
        settargetContracts(res);
      });
  }, []);

  useEffect(() => {
    console.log('targetContracts', targetContracts);
  }, [targetContracts]);

  useEffect(() => {
    // console.log('contracts', contracts);

    const loadContracts = contracts?.some(item => item.status === 'success');

    if (loadContracts) {
      // console.log({loadContracts, status, contracts});
      contracts.forEach((item, index) => {
        if (item.result > 0) {
          console.log('have token', index, targetContracts[index].displayName);
        }
      });

      if (contracts?.some(item => item.result > 0)) {
        //ログイン時
      } else {
        // // トークンなし
        // disconnect();
        // Alert.alert("you don't have required tokens");
      }
    } else if (status === 'disconnected') {
    }
  }, [status, contracts]);
};
