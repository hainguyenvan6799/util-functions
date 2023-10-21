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

// lấy những phần tử của mảng không có dupplicate
function getItemDontHaveDupplicate(arr) {
    const result = arr.filter((item, index) => arr.filter(item2 => item === item2 && arr.indexOf(item2) !== -1).length === 1);
    return result;
}

// Ngoài những giá trị mà cả hai mảng đều có, function này lấy ra những giá trị arr1 có, arr2 không có.
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

// tìm giao giữa hai array
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

// Chúng ta có 3 dropdown select options, danh sách option của 3 dropdown giống nhau, chúng ta muốn rằng khi chọn 1 option 
// , Option đó sẽ không xuất hiện ở hai dropdown còn lại.
// Tham khảo plugin Bulk status update 


export function clone(input: any) {
  if (input === null || typeof input !== 'object') {
    return input;
  }
  const initialOutput = Array.isArray(input) ? [] : {};
  return Object.keys(input).reduce((acc, key) => {
    acc[key] = clone(input[key]);
    return acc;
  }, initialOutput);
}

  async function fetchAsyncDom(parentSelector, childSelector) {
    const getDom = (resolve) => {
      const parent = document.querySelectorAll(parentSelector);
      const parentDom = [...parent].find(v => !v.style.display);
      if (parentDom) {
        const childRent = parentDom.querySelectorAll(childSelector);
        return resolve(childRent);
      }
      setTimeout(() => getDom(resolve), 500);
    };
    return new Promise((resolve, reject) =>getDom(resolve));
  }

  function getLabelForFieldCode(object, fieldCode, arr = []) {
    if (object && object.code === fieldCode) {
        arr.push(object.label);
        return arr;
    }
  
    for (const property in object) {
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        typeof object[property] === 'object' &&
          getLabelForFieldCode(object[property], fieldCode, arr);
      }
    }
    return arr;
  }

  // lấy hoán vị mảng
  // ví dụ:
  // Cho mảng [1,2,3] ==> kết quả: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]
  const permuteTest = (result, arr, permutation, used) => {
  if (permutation.length === arr.length) {
    result.push([...permutation].join(' '));
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!used[i]) {
      used[i] = true;
      permutation.push(arr[i]);
      permuteTest(result, arr, permutation, used);
      used[i] = false;
      permutation.pop();
    }
  }
  return result;
}

// lấy n phần tử bất kì trong mảng:
const getCombo = function*(elements, length) {
  for (let i = 0; i < elements.length; i++) {
    if (length === 1) {
      yield [elements[i]];
    } else {
      let remaining = getCombo(elements.slice(i + 1, elements.length), length - 1);
      for (let next of remaining) {
        yield [elements[i], ...next];
      }
    }
  };
}
// use:
const arr = getCombo([1,2,3], 2);
for (const item of arr) {
  console.log({item});
}
//result: [1,2], [1,3], [2,3]

const isAPointInsideARect = (rectangle, point) => {
  // (x,y): toạ độ của điểm bắt đầu.
  // point: toạ độ của 1 điểm bất kỳ
  const {
    x, y, width, height
  } = rectangle;
  return (
    ((point.x > x && point.x < x + width) ||
      (point.x < x && point.x > x + width)) &&
    ((point.y > y && point.y < y + height) ||
      (point.y < y && point.y > y + height))
  );
}

document.addEventListener("fullscreenchange", () => {
  // Do something
});