import { makeObservable, observable, computed, action } from 'mobx';

class Breadcrumb {
    @observable value = [];

    constructor() {
        makeObservable(this);
    }

    @computed
    get getValue() {
        return this.value.slice();
    }

    @action
    setValue = (index, crumbItem) => {
        this.value[index] = crumbItem;
    }
}

const breadcrumb = new Breadcrumb();

export default breadcrumb;