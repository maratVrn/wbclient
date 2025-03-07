import {makeAutoObservable} from "mobx";

export default class GlobalStore {
    isMenuActive = false
    isMenuActive2 = false
    mainMenuID = 0
    mainMenuName = 'Пусто'
    isNewHoverMainMenu = false
    isNewHoverMainMenu2 = false

    constructor() {
        makeAutoObservable((this))
    }

    setMenuActive(isActive){
        this.isMenuActive = isActive
    }

    setMenuActive2(isActive){
        this.isMenuActive2 = isActive

    }

    setAllMenuActive(isActive){
        this.isMenuActive = isActive
        this.isMenuActive2 = isActive
    }

    setMainMenuIdAndName(id,name){
        this.mainMenuID = id
        this.mainMenuName = name
    }

    setIsNewHoverMainMenu(isHover){
        this.isNewHoverMainMenu = isHover
    }

    setIsNewHoverMainMenu2(isHover){
        this.isNewHoverMainMenu2 = isHover
    }
}
