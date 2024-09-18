import { type Message } from 'ai'

/**
 * A chat object that is stored in the KV store.
 *
 * @property id - A unique identifier for the chat.
 * @property title - The title of the chat.
 * @property createdAt - The date and time the chat was created at.
 * @property userId - The user ID of the user who created the chat.
 * @property path - The path to the chat.
 * @property messages - An array of messages in the chat.
 * @property sharePath - The path to the shared version of the chat.
 */
export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

/**
 * A type that represents the result of a server action.
 *
 * @type T - The type of the result.
 * @property T - The result of the server action.
 * @property { error: string } - An error message if the server action failed.
 */
export type ServerActionResult<T> = Promise<
  | T
  | {
      error: string;
    }
>;

