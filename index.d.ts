/**
 * @noResolution
 */
 declare module "binser"
 {
    /**
     * Serialize (almost) any Lua data into a Lua string.
     * Numbers, strings, tables, booleans, and nil are all fully supported by default.
     * Custom userdata and custom types, both identified by metatables, can also be supported by specifying a custom serialization function.
     * Unserializable data should throw an error. Aliased to `binser.s`.
     * 
     * @param data Data to serialize
     * @returns Serialized data [string]
     */
    function serialize(this: void, ...data: any[]): string;
    /**
     * (Alias to `binser.serialize`)
     * 
     * Serialize (almost) any Lua data into a Lua string.
     * Numbers, strings, tables, booleans, and nil are all fully supported by default.
     * Custom userdata and custom types, both identified by metatables, can also be supported by specifying a custom serialization function.
     * Unserializable data should throw an error. Aliased to `binser.s`.
     * 
     * @param data Data to serialize
     * @returns Serialized data [string]
     */
    function s(this: void, ...data: any[]): string;
    /**
     * Deserialize any string previously serialized by binser.
     * Unrecognized data should throw an error.
     * Results is a list of length `len`.
     * Aliased to `binser.d`.
     * 
     * @param str Data to deserialize
     * @param index Deserializing will start from this position. Can be used to drop leading characters. Default is 0.
     * @returns Tuple `results, len`. Where `results` are deserialized values and `len` is number of deserialized values.
     */
    function deserialize(this: void, str: string, index?: number): LuaMultiReturn<[any[], number]>;
    /**
     * (Alias to `binser.deserialize`)
     * 
     * Deserialize any string previously serialized by binser.
     * Unrecognized data should throw an error.
     * Results is a list of length `len`.
     * Aliased to `binser.d`.
     * 
     * @param str Data to deserialize
     * @param index Deserializing will start from this position. Can be used to drop leading characters. Default is 0.
     * @returns Tuple `results, len`. Where `results` are deserialized values and `len` is number of deserialized values.
     */
    function d(this: void, str: string, index?: number): LuaMultiReturn<[any[], number]>;
    /**
     * Deserializes at most `n` values from str.
     * The default value for `n` is one, so binser.deserializeN(str) will deserialize exactly one value from string, and ignore the rest of the string.
     * Can optionally start at a given index, which is 0 by default. Aliased to `binser.dn`.
     * 
     * @param str 
     * @param n Number of values to deserialize. Default is 1.
     * @param index Deserializing will start from this position. Can be used to drop leading characters. Default is 0.
     * @returns Deserialized values
     */
    function deserializeN(this: void, str: string, n?: number, index?: number): LuaMultiReturn<any[]>;
    /**
     * (Alias to `binser.deserializeN`)
     * 
     * Deserializes at most `n` values from `str`.
     * The default value for `n` is one, so binser.deserializeN(str) will deserialize exactly one value from string, and ignore the rest of the string.
     * Can optionally start at a given index, which is 0 by default. Aliased to `binser.deserializeN`.
     * 
     * @param str 
     * @param n Number of values to deserialize. Default is 1.
     * @param index Deserializing will start from this position. Can be used to drop leading characters. Default is 0.
     * @returns Deserialized values
     */
    function dn(this: void, str: string, n?: number, index?: number): LuaMultiReturn<any[]>;
    type Class = Object;
    /**
     * Registers a custom type, identified by its metatable, to be serialized.
     * Registering types has two main purposes.
     * First, it allows custom serialization and deserialization for userdata and tables that contain userdata, which can't otherwise be serialized in a uniform way.
     * Second, it allows efficient serialization of small tables with large metatables, as registered metatables are not serialized.
     * 
     * @param metatable Metatable, which identifies the type
     * @param name Type name used in serialization. The only requirement for names is that they are unique. 
     * @param serialize Function, which destructs the instance of the type. Can be omitted, if you're registering usual lua table, in that case, default serializer is used.
     * @param deserialize Function, which constructs the instance of the type from arguments, returned by `serialize(object)` function. Can be omitted, if you're registering usual lua table, in that case, default deserializer is used.
     * 
     * @returns `metatable`
     * 
     * Usage:
     * ```ts
     * class Person
     * {
     *  name: string;
     *  age: number;
     * 
     *  constructor(name: string, age: number)
     *  {
     *      this.name = name;
     *      this.age = age;
     *  }
     * }
     * 
     * ...
     * 
     * import * as binser from "binser";
     * binser.register<Person>(Person, "Person",
     *  (person: Person) => {
     *      return binser.serialize(person.name,person.age)
     *  },
     *  (serialized_data: string) => {
     *      let [name,age] = binser.deserializeN(serialized_data,2);
     *      return new Person(name, age);
     *  }
     * )
     * 
     * ```
     */
    function register<T,SerializableArgs extends any[]>(this: void, metatable: Class, name: string, serialize?:(this: void, object: T) => LuaMultiReturn<SerializableArgs>, deserialize?: (this: void, ...args: SerializableArgs) => T): Class;
    /**
     * Explicitly unregister a type.
     * 
     * @param classname Class name (same as string passed to `binser.register`) to unregister
     * @returns Metatable, which was registered as `classname`
     */
    function unregister(this: void, classname: string): Class;
    /**
     * Registers a resource.
     * Resources are are certain objects that don't need to be serialized at all, like images, audio, or any system resource, binser can mark them as such to only serialize a reference to them.
     * 
     * @param resource Resource to register
     * @param name Unique name for a resource
     * @returns Registered resource
     */
    function registerResource<T>(this: void, resource: T, name: string): T;
    /**
     * Explicitly unregister a resource.
     * 
     * @param name Resource name (same as string passed to `binser.register`) to unregister
     * @returns Resource which was registered as `name`
     */
    function unregisterResource(this: void, name: string): any;
    /**
     * Serializes Lua objects and writes them to a file. Overwrites the previous file.
     * 
     * @param filepath Path to write serialized values.
     * @param data Values to serialize.
     */
    function writeFile(this: void, filepath: string, ...data: any[]): void;
    /**
     * Serializes Lua objects and writes them to a file. Doesn't overwrites the previous file.
     * 
     * @param filepath Path to write serialized values.
     * @param data Values to serialize.
     */
    function appendFile(this: void, filepath: string, ...data: any[]): void;
    /**
     * Reads and deserialize a file.
     * 
     * @param filepath File to deserialize.
     * @returns [`results` - list of deserialized values, `len` - number of deserialized values]
     */
    function readFile(this: void, filepath: string): LuaMultiReturn<[any[], number]>;
    /**
     * (Alias to `binser.writeFile`)
     * Serializes Lua objects and writes them to a file. Overwrites the previous file.
     * 
     * @param filepath Path to write serialized values.
     * @param data Values to serialize.
     */
    function w(this: void, filepath: string, ...data: any[]): void;
    /**
    * (Alias to `binser.appendFile`)
    * Serializes Lua objects and writes them to a file. Doesn't overwrites the previous file.
    * 
    * @param filepath Path to write serialized values.
    * @param data Values to serialize.
    */
    function a(this: void, filepath: string, ...data: any[]): void;
    /**
    * (Alias to `binser.readFile`)
    * Reads and deserialize a file.
    * 
    * @param filepath File to deserialize.
    * @returns [`results` - list of deserialized values, `len` - number of deserialized values]
    */
    function r(this: void, filepath: string): LuaMultiReturn<[any[], number]>;
    /**
     * Registers a class as a custom type
     * @param _class class to register
     * @param name defaults to `_class.name`
     * 
     * Usage:
     * ```ts
     * class Vec2
     * {
     *   constructor(public x: number, public y: number)
     *   {
     *   }
     * }
     * 
     * binser.registerClass(Vec2.prototype,Vec2.name)
     * ```
     */
    function registerClass(this: void, _class: Class, name?: string): Class;
    
 }