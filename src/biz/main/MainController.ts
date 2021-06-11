import MainService from "./MainService";

export default class MainController {

    private mainService: MainService;
    constructor(mainService: MainService) {
        this.mainService = mainService;
    }

    
}