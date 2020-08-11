// Type definitions for serverless-mariadb

import * as MariaDB from 'mariadb'

// https://github.com/microsoft/TypeScript/issues/8335#issuecomment-215194561
declare namespace serverlessMaria {
  export type Config = {

    /**
     * Promise library.
     * (Default: Promise)
     */
    promise?: Function

    /**
     * Backoff algorithm to be used when retrying connections.
     * Possible values are full and decorrelated, or you can also specify your
     * own algorithm. See Connection Backoff for more information.
     * (Default: full)
     */
    backoff?: string | Function
    /**
     * Number of milliseconds added to random backoff values.
     * (Default: 2)
     */
    base?: number
    /**
     * Maximum number of milliseconds between connection retries.
     * (Default: 100)
     */
    cap?: number
    /**
     * A MariaDB configuration object as defined here.
     * (Default: {})
     */
    config?: MariaDB.ConnectionConfig
    /**
     * The percentage of total connections to use when connecting to your
     * MariaDB server. A value of 0.75 would use 75% of your total available
     * connections.
     * (Default: 0.8)
     */
    connUtilization?: number
    /**
     * Flag indicating whether or not you want serverless-mariadb to manage
     * MariaDB connections for you.
     * (Default: true)
     */
    manageConns?: boolean
    /**
     * The number of milliseconds to cache lookups of @@max_connections.
     * (Default: 15000)
     */
    maxConnsFreq?: number
    /**
     * Maximum number of times to retry a connection before throwing an error.
     * (Default: 50)
     */
    maxRetries?: number
    /**
     * Event callback when the MariaDB connection fires an error.
     * (Default: () => {})
     */
    onError?: Function
    /**
     * Event callback when MariaDB connections are explicitly closed.
     * (Default: () => {})
     */
    onClose?: Function
    /**
     * Event callback when connections are succesfully established.
     * (Default: () => {})
     */
    onConnect?: Function
    /**
     * Event callback when connection fails.
     * (Default: () => {})
     */
    onConnectError?: Function
    /**
     * Event callback when connections are explicitly killed.
     * (Default: () => {})
     */
    onKill?: Function
    /**
     * Event callback when a connection cannot be killed.
     * (Default: () => {})
     */
    onKillError?: Function
    /**
     * Event callback when connections are retried.
     * (Default: () => {})
     */
    onRetry?: Function
    /**
     * The number of milliseconds to cache lookups of current connection usage.
     * (Default: 0)
     */
    usedConnsFreq?: number
    /**
     * The maximum number of seconds that a connection can stay idle before
     * being recycled.
     * (Default: 900)
     */
    zombieMaxTimeout?: number
    /**
     * The minimum number of seconds that a connection must be idle before
     * the module will recycle it.
     * (Default: 3)
     */
    zombieMinTimeout?: number
  }

  class Transaction {
    query(...args): this
    rollback(fn: Function): this
    commit<T = any>(): Promise<T[]>
  }

  export type methods = {
    connect(wait?: number): Promise<void>
    config(config?: MariaDB.ConnectionConfig): MariaDB.ConnectionConfig
    query<T>(...args): Promise<T>
    end(): Promise<void>
    escape(str: string): MariaDB.EscapeFunctions
    quit(): void
    transaction(): Transaction
    getCounter(): number
    getClient(): MariaDB.Connection
    getConfig(): MariaDB.ConnectionConfig
    getErrorCount(): number
  }
}

declare function init(cfg?: serverlessMaria.Config): serverlessMaria.methods
export = init
