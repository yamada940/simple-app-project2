import '../styles/main.scss'
import ActiveNav from './modules/activeNav';

if(document.getElementById('js-nav') !== null) {
    new ActiveNav({
        navElement: 'js-nav'
    });
}
