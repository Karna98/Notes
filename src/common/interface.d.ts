/**
 * interface.d.ts
 *
 * Description:
 *    Interface Declaration.
 *
 *    Note:
 *    1. The naming convention should be consistent, simple and easy to understand where
 *      this interface will be used. Ex. {Component/Page_Name}Interface
 *
 */

// ================================================================================
// IPC Communication.
// ================================================================================

interface contextBridgeAPI {
  send: (channel: string, data: string) => Promise<void>;
  receive: (channel: string, func: unknown) => Promise<void>;
}

interface MessageInterface {
  status: string | number;
  message?: string;
}

interface IPCRequestInterface {
  URI: string;
  timestamp: number;
  data?: unknown | object;
}

interface IPCResponseInterface extends IPCRequestInterface, MessageInterface {}

// ================================================================================
// Elements
// ================================================================================

interface InputInterface {
  id: string;
  name: string;
  type: React.HTMLInputTypeAttribute | undefined;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

interface ButtonInterface {
  id: string;
  label?: string;
  onClick?: () => void;
}

interface FormInterface {
  id: string;
  method: string;
  elements: FormElementsInterface;
  submitAction: (form: Record<string, unknown>) => void;
  reset?: boolean;
}

interface FormElementsInterface {
  input?: InputInterface[];
  button?: ButtonInterface[];
}

// ================================================================================
// Others.
// ================================================================================

interface AuthCredentialInterface {
  username: string;
  password: string;
}

interface SessionInterface {
  _id: number;
  username: string;
  created_at: number;
  last_logged_in: number;
}

interface SpaceInterface {
  _id?: number;
  space_name: string;
  created_at?: string;
}

interface SpacesInterface {
  metaData: Record<string, unknown>;
  list: SpaceInterface[];
}
