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

interface CredentialsTableInterface {
  _id: number;
  space_id: number;
  credential: string;
  updated_at: number;
}

// ================================================================================
// Elements
// ================================================================================

interface ElementInterface {
  id: string;
  name: string;
  label?: string;
  value?: string | number | readonly string[] | undefined;
}

interface InputInterface extends ElementInterface {
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

interface TextAreaInputInterface extends ElementInterface {
  placeholder?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  readonly?: boolean;
  tabIndex?: number;
}

interface ButtonInterface extends Omit<ElementInterface, 'name' | 'value'> {
  name?: string;
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface FormInterface {
  id: string;
  submitAction: (form?: Record<string, unknown>) => void;
  formValues?: Record<string, unknown>;
}

interface FormElementsInterface {
  input?: InputInterface[];
  button?: ButtonInterface[];
}

interface ModalInterface {
  onClickClose: (value: boolean) => void;
  title: string;
  children: React.ReactNode;
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
  credentials: CredentialStoreType[];
}

interface ElementObjectInterface {
  name: string;
  value: string | number | readonly string[] | undefined;
}
