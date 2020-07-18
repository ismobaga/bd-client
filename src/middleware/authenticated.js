import store from '@/store'
export default function authenticated({ next }) {
    if (!store.getters['auth/authenticated']) {
      return next({ name: 'signin' });
    }
  
    return next();
  }