/// <reference no-default-lib="true"/>
interface JavaObject {
    // The following is from Java
    //deno-lint-ignore no-explicit-any
    equals(other: any): boolean,
    getClass(): unknown,
    hashCode(): unknown,
    notify(): unknown,
    notifyAll(): unknown,
    toString(): string,
    wait(): unknown,
    wait(): unknown,
    wait(): unknown
}

//deno-lint-ignore camelcase
type java_Object = JavaObject;


//deno-lint-ignore camelcase
interface java_io_File extends java_Object {
    /**
     * This method tests whether the file or directory denoted by this abstract pathname exists.
     */
    exists(): boolean
    /**
     * This method creates the directory named by this abstract pathname.
     */
    mkdir(): boolean
    /**
     * This method atomically creates a new, empty file named by this abstract pathname if and only if a file with this name does not yet exist.
     */
    createNewFile(): boolean
    /**
     * Returns an array of strings naming the files and directories in the directory denoted by this abstract pathname.
     */
    list(): string[]
    /**
     * This method returns an array of abstract pathnames denoting the files in the directory denoted by this abstract pathname.
     */
    listFiles(): java_io_File[]
    /**
     * This method tests whether the file denoted by this abstract pathname is a directory.
     */
    isDirectory(): boolean
    /**
     * Returns the name of the file or directory denoted by this abstract pathname.
     */
    getName(): string
    /**
     * Returns the pathname string of this abstract pathname.
     */
    toString(): string
}

declare type java_io_File_constructor = new (a: java_io_File | string, b?: string) => java_io_File;

declare class java_nio_Files implements java_Object{
    /**
     * Read all lines from a file.
     */
    readAllLines(path: java_nio_Path, cs?: java_nio_charset_Charset): string[]
    //deno-lint-ignore no-explicit-any
    equals(other: any): boolean
    getClass(): unknown
    hashCode(): unknown
    notify(): unknown
    notifyAll(): unknown
    toString(): string
    wait(): unknown
    wait(): unknown
    wait(): unknown

}

//deno-lint-ignore camelcase no-empty-interface
interface java_nio_Path extends java_Object {
}

declare class java_nio_Paths {
    /**
     * Converts a path string, or a sequence of strings that when joined form a path string, to a Path.
     * Converts the given URI to a Path object.
     * Static so no constructor.
     */
    get(a: string | unknown, ...b: string[]): java_nio_Path
}

//deno-lint-ignore camelcase
interface java_nio_charset_Charset extends java_Object {
    /**
     * Returns a set containing this charset's aliases.
     * Set<String>
     */
    aliases(): unknown

    /**
     * Constructs a sorted map from canonical charset names to charset objects.
     * static SortedMap<String,Charset> 
     */
    availableCharsets(): unknown

    /**
     * Tells whether or not this charset supports encoding.
     */
    canEncode(): boolean
    /**
     * Compares this charset to another.
     */
    compareTo(that: java_nio_charset_Charset): number
    /**
     * Tells whether or not this charset contains the given charset.
     */
    contains(cs: java_nio_charset_Charset): boolean
    /**
     * Convenience method that decodes bytes in this charset into Unicode characters.
     * CharBuffer
     * ByteBuffer
     */
    decode(bb: unknown): unknown
    /**
     * Returns the default charset of this Java virtual machine.
     */
    defaultCharset(): java_nio_charset_Charset
    /**
     * Returns this charset's human-readable name for the default locale.
     */
    displayName(): string
    /**
     * Returns this charset's human-readable name for the given locale.
     * Locale
     */
    displayName(locale: unknown): string
    /**
     * Convenience method that encodes Unicode characters into bytes in this charset.
     * ByteBuffer
     * CharBuffer
     */
    encode(cb: unknown): unknown
    /**
     * Convenience method that encodes a string into bytes in this charset.
     * ByteBuffer
     */
    encode(str: string): unknown
    /**
     * Tells whether or not this object is equal to another.
     */
    equals(ob: java_Object): boolean
    /**
     * Returns a charset object for the named charset.
     */
    forName(charsetName: string): java_nio_charset_Charset
    /**
     * Computes a hashcode for this charset.
     */
    hashCode(): number
    /**
     * Tells whether or not this charset is registered in the IANA Charset Registry.
     */
    isRegistered(): boolean
    /**
     * Tells whether the named charset is supported.
     */
    isSupported(charsetName: string ): boolean
    /**
     * Returns this charset's canonical name.
     */
    name(): string
    /**
     * Constructs a new decoder for this charset.
     * CharsetDecoder
     */
    newDecoder(): unknown
    /**
     * Constructs a new encoder for this charset.
     * CharsetEncoder
     */
    newEncoder(): unknown
    /**
     * Returns a string describing this charset.
     */
    toString(): string
}

//deno-lint-ignore camelcase
interface java_nio_charset_StandardCharsets extends java_Object {
    /**
     * ISO Latin Alphabet No.
     */
    ISO_8859_1: java_nio_charset_Charset

    /**
     * Seven-bit ASCII, a.k.a.
     */
    US_ASCII: java_nio_charset_Charset

    /**
     * Sixteen-bit UCS Transformation Format, byte order identified by an optional byte-order mark
     */
    UTF_16: java_nio_charset_Charset

    /**
     * Sixteen-bit UCS Transformation Format, big-endian byte order
     */
    UTF_16BE: java_nio_charset_Charset

    /**
     * Sixteen-bit UCS Transformation Format, little-endian byte order
     */
    UTF_16LE: java_nio_charset_Charset

    /**
     * Eight-bit UCS Transformation Format
     */
    UTF_8: java_nio_charset_Charset

}

declare class Java {
    static type(type: string): unknown
    static from(arg: unknown): unknown
}