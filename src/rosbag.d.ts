declare module 'rosbag' {
    import { IndexableObject } from "ros-web-vue/src/assets/utils/types";
    import { CachedMessage, Timestamp } from "ros-web-vue/src/core/types";

    export interface BagConnectionEntry {
        type: string
        topic: string
    }

    export default class Bag {
        constructor(reader: BagReader)
        open(): Promise<void>

        startTime: Timestamp
        endTime: Timestamp

        readMessages(params: {
            topics: string[],
            startTime: Timestamp,
            endTime: Timestamp,
            decompress: IndexableObject<Function>,
            pendingMap: unknown
        }, cb: (msg: CachedMessage) => void): Promise<void>

        readonly connections: IndexableObject<BagConnectionEntry>
    }

    export class BagReader {
        constructor(loader: any)
    }

    export interface BagConnectionEntry {

    }

    export function open(url: string | Blob): Promise<Bag>
}