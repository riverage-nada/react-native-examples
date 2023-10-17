import {useEffect} from 'react';
import {useAccount, useContractReads} from 'wagmi';

export const useContractBalances = targetContracts => {
  const {address} = useAccount();

  const {data: contracts} = useContractReads({
    contracts: targetContracts.map(item => {
      return {
        address: item.contractAddress,
        abi: JSON.parse(item.abi),
        functionName: 'balanceOf',
        args: [address],
        enabled: Boolean(address),
        chainId: item.chainId,
      };
    }),
  });

  // useEffect(() => {
  //   console.log({ contracts });
  //   contracts?.forEach((item) => {
  //     console.log(typeof item.result);
  //   });
  // }, [contracts]);

  return {contracts};
};
