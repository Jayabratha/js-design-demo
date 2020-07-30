import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from 'firebase';

const sessionUserString = window.sessionStorage.getItem('user');
const user: User | null = sessionUserString ? JSON.parse(sessionUserString) : null;
const authSubject = new BehaviorSubject<User | null>(user);

export const AuthService = {
    setAuth: (content: User | null) => {
        window.sessionStorage.setItem('user', JSON.stringify(content));
        authSubject.next(content);
    },
    getAuth: (): Observable<User | null> => {
        return authSubject.asObservable();
    },
    getSessionUser: (): User | null => {
        const userString = window.sessionStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    },
};
