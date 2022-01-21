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

interface ContextBridgeInterface {
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
// Models.
// ================================================================================

interface UsersTableInteface {
  _id: number;
  username: string;
  created_at: number;
  last_logged_in: number;
  password: string;
  l_pin: string;
  s_pin: string;
}

interface SpacesTableInterface {
  _id: number;
  space_name: string;
  created_at: string;
}

interface NotesTableInterface {
  _id: number;
  space_id: number;
  note: string;
  updated_at: number;
}

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

interface SpacesInterface {
  metaData: Record<string, unknown>;
  list: SpacesTableInterface[];
  currentSpace?: SpaceInterface;
}

interface SpaceInterface {
  space_id: number;
  notes: NoteStoreType[];
}
