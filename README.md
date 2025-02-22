# starknet-workshop

1. Git checkout the project

```
git clone https://github.com/kmjones1979/starknet-workshop-subgraph.git
cd starknet-workshop-subgraph
git checkout subgraph
```

2. Build

```
substreams build
```

3. Auth (if you want to use gui)

```
substreams auth
```

4. Launch gui

```
substreams gui
```

5. Rebuild subgraph (optional)

```
substreams codegen subgraph
```

6. Install dependencies

```
cd subgraph
npm install
```

7. Generate types

```
npm run generate
```

Example Entity

```
type MyEntity @entity {
    id: ID!
    jsonDescription: String!
}
```

Example handler

```
import { Protobuf } from "as-proto/assembly";
import { Events as protoEvents } from "./pb/starknet/v1/Events";
import { MyEntity, Transfer, Approval } from "../generated/schema";
import { BigInt, log, crypto, Bytes } from "@graphprotocol/graph-ts";

export function handleTriggers(bytes: Uint8Array): void {
    const input = Protobuf.decode<protoEvents>(bytes, protoEvents.decode);

    const inputHash = crypto
        .keccak256(Bytes.fromUint8Array(bytes))
        .toHexString();
    let entity = new MyEntity(inputHash);
    for (let i = 0; i < input.events.length; i++) {
        entity.jsonDescription = input.events[i].jsonDescription;
    }

    entity.save();
}
```

8. Deploy

> Locally

```
npm run deploy-local
```

> Studio

```
npm run deploy-studio
```
