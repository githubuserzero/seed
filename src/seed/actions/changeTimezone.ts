import { ContextState } from 'app/context';

export default (timezone: string) => ({updateTimezone}: ContextState) => {
  updateTimezone(timezone);
}