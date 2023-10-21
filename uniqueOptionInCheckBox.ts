type ItemType = {
  label: string;
  value: string;
  isDisabled: boolean;
}

type ItemKey = "label" | "value" | "isDisabled";
type ParamsType = {
  items: Array<Record<ItemKey, ItemType>>;
  value: string;
  isDisabled?: boolean;
  isVisable?: boolean;
}

class Dropdown {
    private dropdown: HTMLElement;
    constructor(params: ParamsType) {
        this.init(params);
    }

    init(params: ParamsType) {
        const {items, value, isDisabled = false, isVisable = true} = params;
        const dropdown = document.createElement('select');
        const options = document.createElement('option');
        console.log({items, value, isDisabled, isVisable, dropdown, options});
    }
}