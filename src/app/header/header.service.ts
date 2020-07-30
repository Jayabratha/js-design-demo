import { BehaviorSubject } from 'rxjs';
import { HeaderContent } from './header-content';
import { Observable } from 'rxjs';

const headerSubject = new BehaviorSubject<HeaderContent>({
    primaryText: '',
    secondaryText: '',
    isHome: false,
  });

export const HeaderService = {
    setHeaderContent: (content: HeaderContent) => headerSubject.next(content),
    getHeaderContent: (): Observable<HeaderContent> => headerSubject.asObservable(),
};
