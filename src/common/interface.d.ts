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

interface InputElementInterface {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
}

interface ButtonElementInterface {
  className?: string;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

interface FormElementInterface {
  className?: string;
  formFields: FormType;
  inputElements: InputElementInterface[];
  method: string;
  reset?: boolean;
  submitAction: (form: FormType) => void;
}

// ================================================================================
// Form.
// ================================================================================

// Login Form
type LoginFormInterface = {
  password: string;
  username: string;
};

// Register Form
interface RegisterFormInterface extends LoginFormInterface {
  retypePassword: string;
}

// Spaces Form
interface SpacesFormInterface {
  space_name: string;
}

// ================================================================================
// Others.
// ================================================================================

interface AuthCredentialInterface {
  username: string;
  password: string;
}

interface SpaceInterface extends SpacesFormInterface {
  _id?: number;
  created_at?: string;
}

interface SpacesInterface {
  metaData: Record<string, unknown>;
  list: SpaceInterface[];
}

interface SessionInterface {
  _id: number;
  created_at: number;
  last_logged_in: number;
  username: string;
}
