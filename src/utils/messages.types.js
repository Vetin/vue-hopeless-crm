import store from '../store';

const locale = store.getters.info.locale;

const isRu = locale === 'ru-RU';
export default {
  logout: isRu ? 'Вы успешно вышли из системы' : 'Logout was completed',
  login: isRu
    ? 'Для доступа к данной страницы вам необходимо авторизоваться'
    : 'For get access to this page you need authorize',
  'auth/user-not-found': isRu
    ? 'Пользователь с указанными данными не найден'
    : 'User was not found',
  'auth/wrong-password': isRu
    ? 'Вы ввели неправильные данные'
    : 'You inserted incorrect data',
  'auth/email-already-in-use': isRu
    ? 'Пользователь с указанной почтой уже существует'
    : 'User with this email is exist',
  'record/have-not-enough-bill': isRu
    ? 'На вашему счету не достасточно средств, для создания данной записи'
    : 'You have not enough funds for this action',
  'changeProfile/success': !isRu
    ? 'Данные успешно обновленны'
    : `Data was updated`,
};
