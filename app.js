//form id is registrar, form has a special event called submmit
document.addEventListener('DOMContentLoaded', () => {  //browser will load the code after the DOM is fully loaded. this prevents, now <script> in HTML can be placed anywhere on the page, and DOM will still work 

  const form = document.getElementById ('registrar'); //const make it consistent since we do not assign it to another value
  const input = form.querySelector('input') //input element inside the form

  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList'); // we can use it for the eventListeners we set. if we put this inside the addEventListener, we can not declare another one due to scope

  const div = document.createElement('div');
  const filterLabel = document.createElement ('label');
  const filterCheckBox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div,ul);


  filterCheckBox.addEventListener('change', (e) => { //checkbox triggers a change event
      const isChecked = e.target.checked;
      const lis = ul.children;
      if(isChecked) {
        for (let i = 0; i < lis.length; i += 1) {
          let li = lis[i];
          if (li.className === 'responded') {
            li.style.display = '';  
          } else {
            li.style.display = 'none';                        
          }
        }
      } else {
        for (let i = 0; i < lis.length; i += 1) {
          let li = lis[i];
          li.style.display = '';
        }                                 
      }
    });


  function createLI(text){  
    function createElement (elementName, property, value) {   // property - since it will differ from element to elememnt. value -  we can assign a property to a value
      const element = document.createElement(elementName);
      element[property] = value;  // we can use the string to access the property element
      return element;
    }
    function appendToLI(elementName, property, value) {
      const element = createElement (elementName, property, value);
      li.appendChild(element);
      return element  //without it, we can't pass to the checkbox for label
    }
      const li = document.createElement('li');
      appendToLI('span', 'textContent', text);
      appendToLI ('label', 'textContent', 'Confirmed')
        .appendChild(createElement('input', 'type', 'checkbox'));
      appendToLI('button', 'textContent', 'edit');  
      appendToLI('button', 'textContent', 'remove');
      return li;
  }

  /* Before code refactoring, we have the following line: 
       const span = document.createElement('span');
      span.textContent = text  
      li.appendChild(span)
 we set the property to a value, text is whatever text/string value that was passed into the createLI function.
*/
  form.addEventListener('submit', (e) => {  //handler function
    e.preventDefault();    // it cancels the default submit behavior, without it, the whole page reloading when submit which is a normal function
    const text = input.value;
    input.value = "";
    const li = createLI(text)
    ul.appendChild(li);
  });

  ul.addEventListener('change', (e) => {   //change as event type, function e holds the event object
      const checkbox = event.target;
      const checked = checkbox.checked;
      const listItem  = checkbox.parentNode.parentNode;  // 1 - to the label element, 2 - to the list item

      if (checked) {   //if statement comes in handy when use check on/off the box
          listItem.className = "responded";
      } else {
          listItem.className = "";    //reset. remove the class if check is false
      } //console.log(e.target.checked);  check the checkbox true or false in the console
  }); 

  ul.addEventListener('click', (e) => { 
  if (e.target.tagName === "BUTTON") {  //use if statement to filter out the button that is not a button
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const action = button.textContent;
    const nameActions = {    //make it object
      remove: () => { 
        ul.removeChild (li);
      },  // values in object using comma
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';  
      },
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';        
      }
    };
      nameActions[action]();     // select and run action in button's name

  /* orginal code for above
  const actiion = button.textContent;
  nameActions[action]();
      if (action === 'remove') {  
        nameAction.remove();
      } else if(action === 'edit') {  
        nameAction.edit();
      } else if(action === 'save') {
        nameAction.save();
      } */  
    }
  });
});