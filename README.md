# TSTL binser

Declarations for [binser](https://github.com/bakpakin/binser), Customizable Lua Serializer.


| Command | Description |
|-|-|
| `yarn add -D tstl-binser` | Install these declarations |
| `yarn add bakpakin/binser` | Install binser |


Upon installation these declarations can be linked to a _tsconfig.json_ file.

```json
{
    "compilerOptions": {
        "types": [
            "tstl-binser"
        ]
    }
}
```

And used within any _.ts_ file.

```ts
import * as binser from "binser";

class Vec2
{
    constructor(public x: number, public y: number)
    {
    }
}

// use binser.registerClass for automatic class serialization
binser.registerClass(Vec2.prototype,Vec2.name);

// or binser.register for custom serializers and deserializers
binser.register<Vec2,[number,number]>(Vec2.prototype, Vec2.name,
    //serialize()
    (v: Vec2) => {
        return $multi(v.x, v.y)
    },
    //deserialize
    (x: number, y: number) => {
        return new Vec2(x,y)
    }
)


let original: Vec2 = new Vec2(42, 1234);
let serialized: string = binser.serialize(original);
let deserialized: Vec2;
[deserialized] = binser.deserializeN(serialized, 1);

if(original.x === deserialized.x && original.y === deserialized.y)
    print('original === deserialized');
```

Make sure to append `";./node_modules/tiny-ecs/?.lua"` to your `package.path` in a _conf.ts_ file (this is run first) to assist where Lua looks for modules.

```ts
package.path += ";./node_modules/?/?.lua";
```

Also you need to add `"typescript-to-lua/language-extensions"` to _tsconfig.json_ file.
```json
{
    "compilerOptions": {
        "types": [
            "typescript-to-lua/language-extensions"
        ]
    }
}
```