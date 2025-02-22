import { Protobuf } from "as-proto/assembly";
import { Transactions as protoTransactions } from "./pb/sf/substreams/starknet/type/v1/Transactions";
import { MyEntity, Transfer, Approval } from "../generated/schema";
import { BigInt, log, crypto, Bytes } from "@graphprotocol/graph-ts";

export function handleTriggers(bytes: Uint8Array): void {
    const input = Protobuf.decode<protoTransactions>(
        bytes,
        protoTransactions.decode
    );

    // No ID field has been found in the proto input...
    // The input has been hashed to create a unique ID, replace it with the field you want to use as ID
    const inputHash = crypto
        .keccak256(Bytes.fromUint8Array(bytes))
        .toHexString();

    let transfer = new Transfer(Bytes.fromHexString(inputHash));
    transfer.from = Bytes.fromHexString(transfer.from.toHexString());
    transfer.to = Bytes.fromHexString(transfer.to.toHexString());
    transfer.value = BigInt.fromString(transfer.value.toString());
    transfer.timestamp = transfer.timestamp;
    transfer.blockNumber = BigInt.fromString(transfer.blockNumber.toString());
    transfer.save();
}
