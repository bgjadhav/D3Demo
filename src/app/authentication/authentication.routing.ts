import { Routes } from '@angular/router';

import { NotfoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { SignupComponent } from './signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
       {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Authentication',
          urls: [
            { title: 'Authentication', url: '/authentication' },
            { title: 'Classic Dashboard' }
          ]
        }
      },
      {
        path: '404',
        component: NotfoundComponent
      },
      {
        path: 'lock',
        component: LockComponent
      },
     
      {
        path: 'login2',
        component: Login2Component
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signup2',
        component: Signup2Component
      }
    ]
  }
];
