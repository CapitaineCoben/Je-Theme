










window.addEventListener('load', go);

let actions, model, state, view;

function go() {
  console.log('GO !');


  const data = {

  };

  actions.initAndGo(data);


};

actions = {

  checkboxCheck(data){
    console.log(data.checked);
    if (data.checked) {
      model.samPresent({
        do : 'DisableEnableSlide',
        newSlideDisabledValue : '',
        newCheckedValue : 'checked'
      });
    }else {
      model.samPresent({
        do : 'DisableEnableSlide',
        newSlideDisabledValue : 'disabled="disabled"',
        newCheckedValue : ''
      });
    }

  },

  initAndGo(data) {
    model.samPresent({
      do : 'init',
    });
  },

  JourNuit(){
    if (model.value) {
      model.samPresent({
        do : 'cestLeJour',
        newModelValue : false
      });
    }else {
      model.samPresent({
        do : 'cestLaNuit',
        newModelValue : true
      });
    }

  },

  changeMode(data){
    if (model.boutons.value == 'Mode Nuit') {
      model.samPresent({
        do : 'changeMode',
        newMode : 'Mode Jour',
      });
    }else {
      model.samPresent({
        do : 'changeMode',
        newMode : 'Mode Nuit'
      });
    }

  },

};

model = {
  value: false,
  boutons: {
    value: 'Mode Nuit',
  },
  checkbox:{
    checked: '',
  },
  slide:{
    disabled : 'disabled="disabled"',
  },
  app: {
    sectionId: 'app'
  },

  samPresent(data) {

    switch (data.do) {
      case 'init':
        break;

      case 'changeMode':
        this.boutons.value = data.newMode;
        break;

      case 'cestLaNuit':
        this.value = data.newModelValue;
        break;

      case 'cestLeJour':
        this.value = data.newModelValue;
        break;

      case 'DisableEnableSlide':
        this.slide.disabled = data.newSlideDisabledValue;
        this.checkbox.checked = data.newCheckedValue;
        console.log(model.slide.disabled);
        break;

        break;

      default:
        console.error(`model.samPresent(), unknown do: '${data.do}' `);
    }


    state.samUpdate(this);
  },

};

state = {

  samUpdate(model) {

    this.samRepresent(model);
  },

  samRepresent(model) {

    let representation = '';
    let boutonUI = view.boutonsUI(model,state);
    let demarrageUI = view.demarrageUI(model.state);

    if (model.value) {
      representation += boutonUI;
    }else {
      representation += demarrageUI;
    }


    representation = view.generateUI(model, this, representation);

    view.samDisplay(model.app.sectionId, representation);
  },
};

view = {


  samDisplay(eltId, representation) {
    const elt = document.getElementById(eltId);
    elt.innerHTML = representation;

    if (model.value) {
    var Slider = document.getElementById("Slider");
  Slider.type="range";
  Slider.min=0;
  Slider.max=255;

  var Slider2 = document.getElementById("Slider2");
 Slider2.type="range";
 Slider2.min=0.2;
 Slider2.max=1;
 Slider2.step=0.1;
    Slider.addEventListener("change", function(){
  var Valeur=Slider.value;
  var Valeur2=Slider2.value;
  document.body.style.backgroundColor= "rgba("+Valeur+","+Valeur+","+Valeur+","+Valeur2+")";

  if(Slider.value<=127)
  {
      document.body.style.color="white";

  }
  else
  {
    document.body.style.color="black";
  }
});



  Slider2.addEventListener("change", function(){
    document.body.style.opacity=Slider2.value;
});
}
  },


  generateUI(model, state, representation) {
    return `
    <div class="container" >
      ${representation}
    </div>
    `;
  },

  demarrageUI(model,state){
    return `
      <button onclick="actions.JourNuit()" type="button" name="button" value="">C'est la nuit !</button>
    `;
  },

  boutonsUI(model,state){

    return`
    <section>
      <button onclick="actions.changeMode({value : value })" type="button" name="button">${model.boutons.value}</button>
      <button onclick="actions.JourNuit()" type="button" name="button">C'est le jour</button>
    </section>
    <section>
      <input id="Slider" type="range" ${model.slide.disabled}>
      <input type="checkbox" min="0" max="255" step="1" onchange="actions.checkboxCheck({checked : checked})" ${model.checkbox.checked}>
    </section>
    <section>
      <input id="Slider2" min="0.2" max="1" step="0.1" type="range" name="" value="">
    </section>
    `;
  },

};
