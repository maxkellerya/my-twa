import { useEffect, useState } from "react";
import { Counter } from "../contracts/Counter";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useInit } from "./useInit";
import { Address, OpenedContract, toNano } from "@ton/core";

export function useCounterContract() {
    const client = useTonClient();
    const { sender } = useTonConnect();
    const [contractData, setContractData] = useState<null | number>();
    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

    const counterCountract = useInit(async () => {
        if (!client) return;
        const contract = new Counter(Address.parse('EQB4mnnKBw_OQZl4oqSGuy2qLsZqF_uy37P8LANEY5Ut2fuI'));
        return client.open(contract) as OpenedContract<Counter>;
    }, [client]);

    useEffect(() => {
        async function getValue() {
            if (!counterCountract) return;
            setContractData(null);
            const contractData = await counterCountract.getCounter();
            setContractData(Number(contractData));
            await sleep(5000);
            getValue();
        }
        getValue();
    }, [counterCountract]);

    return {
        contract_address: counterCountract?.address.toString(),
        counter: contractData,
        sendIncrement: () => {
            return counterCountract?.sendIncrement(sender, toNano("0.002"));
        }
    }
}

