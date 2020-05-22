var lista_score = JSON.parse(localStorage.getItem('lista-score') || '[]');
var l, n, m, I_S, IsOver, MaxS, StartTime, EndTime, MaxX=6, MaxY=5, S_New=2;
Series = new Array(4);

for (l=0; l < 4; l++){
  Series[l]=new Array(2); 
}

Symbol = new Array(MaxX);

for (n=0; n < MaxX; n++){
  Symbol[n]=new Array(MaxY); 
} 

IsSolved = new Array(MaxX);

for (n=0; n < MaxX; n++){
  IsSolved[n]=new Array(MaxY); 
} 

PicNum = new Array(30);

Pic = new Array(31);
for (l=0; l < 31; l++){
  Pic[l] = new Image(); 
  Pic[l].src = "img/memo"+eval(l)+".gif"; 
} 

window.fn = {};
window.fn.toggleMenu = function () {
  document.getElementById('appSplitter').right.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById('appTabbar').setActiveTab(index);
  document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
  window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
  }
};

// SCRIPT PARA CRIAR O MODAL DE AGUARDE
window.fn.showDialog = function (id) {
  var elem = document.getElementById(id);      
  elem.show();            
};

//SCRIPT PARA ESCONDER O MODAL DE AGUARDE
window.fn.hideDialog = function (id) {
  document.getElementById(id).hide();
};
function maxArray(array) {
  return Math.max.apply(Math, array);
};
var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  // deviceready Event Handler    
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {    
    this.receivedEvent('deviceready');  
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('receivedEvent');
  },
  //FUNÇÃO DE BUSCA
  onSearchKeyDown: function(id) {
    if (id === '') {
      return false;
    }
    else{}
  },

  SetSeriesLen: function(ll){
    S_New=ll;
    this.Scramble();
  },

  Clicked: function(nn, mm){
    if (this.Pressed(nn, mm))
      this.RefreshScreen();
  },

  Show: function(){
    if (IsOver)
      ons.notification.alert({
        message: 'Tudo é certo.',
        title: 'Mensagem',
      });
    else{ 
      for (n=0; n < MaxX; n++){
        for (m=0; m < MaxY; m++)
          IsSolved[n][m]=true;
      }
      this.RefreshScreen();
      ons.notification.alert({
        message: 'Mostrar não é resolver!',
        title: 'Mensagem',
      });
      IsOver=true;
    }
  },
  
  Scramble: function(){
    admob.interstitial.show();
    fn.showDialog('modal-aguarde');
    var ll;
    var nn;
    var mm;
    MaxS=S_New;
    for (l=0; l<30; l++)
      PicNum[l]=l;
    for (ll=0; ll<108; ll++){ 
      n=Math.round(Math.random()*100)%30;
      m=Math.round(Math.random()*100)%30;
      l=PicNum[n];
      PicNum[n]=PicNum[m];
      PicNum[m]=l;
    }
    l=0;
    for (n=0; n<MaxX; n++){ 
      for (m=0; m<MaxY; m++){ 
        IsSolved[n][m]=false;
        Symbol[n][m]=l % (MaxX*MaxY/MaxS);
        l++;
      }
    }
    for (l=0; l<1080; l++){ 
      n=Math.round(Math.random()*100)%MaxX;
      m=Math.round(Math.random()*100)%MaxY;
      nn=Math.round(Math.random()*100)%MaxX;
      mm=Math.round(Math.random()*100)%MaxY;
      ll=Symbol[n][m];
      Symbol[n][m]=Symbol[nn][mm];
      Symbol[nn][mm]=ll;
    }  
    I_S=0;
    Moves=0;
    IsOver=false;
    fn.hideDialog('modal-aguarde');
    this.RefreshScreen();  
    Now = new Date();
    StartTime = Now.getTime() / 1000;
  },

  Pressed: function(nn, mm){ 
    if (IsOver)  
      return(false);
    if (IsSolved[nn][mm]) 
      return(false);
    for (l=0; l<I_S; l++){ 
      if ((Series[l][0]==nn)&&(Series[l][1]==mm))
        return(false);
    }
    l=Symbol[nn][mm];
    if (I_S==0){ 
      Series[0][0]=nn;
      Series[0][1]=mm;
      I_S=1;
    }
    else{ 
      if (Symbol[Series[0][0]][Series[0][1]]!=l){ 
        Series[0][0]=nn;
        Series[0][1]=mm;
        I_S=1;
      }
      else{ 
        Series[I_S][0]=nn;
        Series[I_S][1]=mm;
        I_S++;
      }
    }
    if (I_S==MaxS){ 
      for (l=0; l<I_S; l++)
        IsSolved[Series[l][0]][Series[l][1]]=true;
      I_S=0;
      IsOver=true;
      for (n=0; n<MaxX; n++){ 
        for (m=0; m<MaxY; m++){ 
          if (! IsSolved[n][m])
            IsOver=false;
        }
      }
    }
    Moves++;
    return(true);
  },

  RefreshScreen: function(){ 
    var ll;
    for (m=0; m < MaxY; m++){ 
      for (n=0; n < MaxX; n++) { 
        if (IsSolved[n][m])
          l=PicNum[Symbol[n][m]]+1;
        else 
          l=0;
        for (ll=0; ll<I_S; ll++){ 
          if ((Series[ll][0]==n)&&(Series[ll][1]==m)){ 
            l=PicNum[Symbol[n][m]]+1;
          }
        }
        window.document.images[MaxX*m+n].src = Pic[l].src;
      }     
    }
    if (IsOver) 
    { Now = new Date();
      EndTime = Now.getTime() / 1000;
      ll=Math.floor(EndTime - StartTime);
      if (window.opener){ 
        if (window.opener.SetHighscores)
          window.opener.SetHighscores("Memória",S_New+" pics",ll,-1);
      }
      ons.notification.alert({
        message: "Valeu, você resolveu este jogo com "+Moves+" lances em "+ll+" segundos!",
        title: 'Mensagem',
      });
    }
  },

  Help: function(){ 
    ons.notification.alert({
        message: "O Jogo da Memória é um jogo bem conhecido. Há diversos quadrados com"+
        "\nimagens que todos são cobertas no começo. Há sempre"+
        "\nalguns quadrados com a mesma imagem. Quando você estala"+
        "\nsobre os quadrados com as mesmas imagens, um depois que o"+
        "\noutro, então as imagens permanecerão descobertas, se não"+
        "\nsomente a última imagem selecionada permanece descoberta."+
        "\nO jogo é resolvido quando todas as imagens são visíveis."+
        "\nBoa sorte!",
        title: 'Mensagem',
      });
  }
};
app.initialize();