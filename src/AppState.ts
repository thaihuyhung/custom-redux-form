import { AllFormState } from './components/Form/reducer';
import { ContactPageState } from './containers/ContactPage/reducer';

interface AppState {
  root: null;
  form: AllFormState | null;
  contactPage: ContactPageState | null;
}

export default AppState;
