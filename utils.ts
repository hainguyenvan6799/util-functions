// checked all sub-checkbox when click checkbox select all
function checkedAllCheckBoxWithName(selectAllElement: HTMLInputElement, subCheckBoxesClass: string) {
    const subCheckBoxes: any = document.getElementsByClassName(subCheckBoxesClass);

    return subCheckBoxes.map((subCheckBox: HTMLInputElement) => {
        subCheckBox.checked = selectAllElement.checked;
        const valueOfSubCheckBox =
            subCheckBox.checked && JSON.parse(subCheckBox.value);
        return valueOfSubCheckBox;
    }).filter((valueOfSubCheckBox) => valueOfSubCheckBox);
}

// generate new file name
function setNewFileName(arrayObject, propertyToCheck) {
    const fileNames = [];
    const newValues = arrayObject.map(value => {
        let [fileName, fileExtension] = value[propertyToCheck].split(".");
        let newFileName = generateNewFileName(fileName, fileNames)
        fileNames.push(newFileName);

        return {
            ...value,
            name: newFileName + "." + fileExtension
        };
    });
    return newValues;
}

function generateNewFileName(fileName, result) {
    let newFileName = fileName, suffix = 1;
    while (result.indexOf(newFileName) >= 0) {
        newFileName = `${fileName}(${suffix++})`;
    }
    return newFileName;
}

// Delete property in object
export const deleteProps = (obj, props) => {
    const currentProps = !Array.isArray(props) ? [props] : [...props];
    return Object.keys(obj).reduce((newObj, prop) => {
        if (!currentProps.includes(prop)) {
            newObj[prop] = obj[prop];
        }
        return newObj;
    }, {});
};

// Get object inside object with key name
export const findAllValuesWithProp = (object, keyName, arr = []) => {
    const containerObject = arr;
    if (object && object[keyName]) {
        containerObject.push(object);
    }

    for (const property in object) {
        typeof object[property] === "object" &&
            findAllValuesWithProp(object[property], keyName, containerObject);
    }
    return containerObject;
};

// array contains objects
function removeDupplicateObjectInArray(array) {
    const values = array.map(item => item.value);
    const filtered = array.filter(({ value }, index) => !values.includes(value, index + 1));
    return filtered;
}

// l???y nh???ng ph???n t??? c???a m???ng kh??ng c?? dupplicate
function getItemDontHaveDupplicate(arr) {
    const result = arr.filter((item, index) => arr.filter(item2 => item === item2 && arr.indexOf(item2) !== -1).length === 1);
    return result;
}

// Ngo??i nh???ng gi?? tr??? m?? c??? hai m???ng ?????u c??, function n??y l???y ra nh???ng gi?? tr??? arr1 c??, arr2 kh??ng c??.
function test(arr1, arr2) {
    return arr1.filter(item1 => !arr2.includes(item1));
  }

const intersectMany = (...arrs) => {
    let res = arrs[0].slice(); //clone object
    for (let i = 1; i < arrs.length; i++) {
        res = intersection(res, arrs[i]);
    };
    return res;
};

// t??m giao gi???a hai array
const intersection = (arr1, arr2) => {
    return arr1.filter(item1 => arr2.some(item2 => item2.value === item1.value));
};

const isItemExistsInArray = (arr: any[] = [], item: any) => {
    if (arr.indexOf(item) !== -1) {
        return {
            index: arr.indexOf(item),
            isExist: true
        };
    }
    return {
        isExist: false,
        index: null
    }
}

const getRestItems = (allItems: any[], selectedItems: any[]) => {
   return allItems.filter(item => !selectedItems.some(selectedItems => selectedItems === item));
}

function checkUniqueDropdownField(fieldsTextDropdown: Dropdown[], element: Dropdown, pluginSettings: PluginSettingsType) {
    const elementValue = element.getValue();
    const elementIndex = fieldsTextDropdown.indexOf(element);
  
    const allDropdownItems: any[] = pluginSettings.allOptionsOfFieldText;
    const selectedDropdownValues: string[] = fieldsTextDropdown.reduce((finalArr: any[], dropdown: Dropdown) => {
      if (dropdown.getValue() !== '') {
        finalArr.push(dropdown.getValue());
      }
      return finalArr;
    }, []);
    const restItems = allDropdownItems.filter(({value: itemValue}) => !selectedDropdownValues.some((dropdownValue) => dropdownValue === itemValue));
    fieldsTextDropdown.forEach((dropdown, index) => {
      if (dropdown.getValue() === elementValue && index !== elementIndex) {
        dropdown.setValue('');
      }
      const isDropdownValueExistsInRestItems = restItems.some((item) => item.value === dropdown.getValue());
      if (isDropdownValueExistsInRestItems) {
        dropdown.setItems(restItems);
      } else {
        const currentValue = {
          label: dropdown.render().innerText,
          value: dropdown.getValue(),
        };
        const newItems = [...restItems, currentValue];
        dropdown.setItems(newItems);
      }
    });
  
    const allDropdownValues = fieldsTextDropdown.filter((dropdown) => dropdown.getValue() !== '');
  
    if (allDropdownValues.length === fieldsTextDropdown.length) {
      fieldsTextDropdown.forEach((dropdown) => dropdown.setItems(pluginSettings.allOptionsOfFieldText));
    }
  }
