let emojis = ['🤯','👍','👎','😀','😢','❤️','😡','😂','😮','🤦',];

function find_user() {
  var imgs = [...document.getElementsByTagName('img')].filter(e => e.src.startsWith('https://lh3.googleusercontent.com/'));
  if (imgs.length) {
    var img = imgs[0];
    var img_src = img.src;
    var name = img.nextSibling.childNodes[0].title;
    var email = img.nextSibling.childNodes[0].innerText;
    var user = {name, img_src}; // not email (privacy)
    return user;
  } else {
    console.log('no user found')
  }

}

var user = find_user();
console.log('user',user);

function display(meeting_id, data) {
  console.log('got',data)
  //var targets = [...document.querySelectorAll('[data-meeting-code="'+ meeting_id +'"]')];
  //var targets = [...document.querySelectorAll('[data-resolution-cap="0"]')];
  //var targets = [...document.getElementsByTagName("video")];
  var targets = [...document.getElementsByTagName("c-wiz")];
  console.log('targets', targets)
  if (!targets.length) return;
  let target = targets[0];
  var span = document.createElement('span');
  span.style.fontSize='20pt';
  span.style.position = 'absolute'; //'relative';
  span.style.top = Math.floor(60 + Math.random() * 25).toString() + '%';
  span.style.left = Math.floor(2 + Math.random() * 93).toString() + '%';
  var img = document.createElement('img');
  img.src = data.img_src;
  img.title = data.name;
  img.alt = data.name;
  img.height = '24';
  img.style.position = 'absolute';
  img.style.top = '18pt'
  img.style.left = '18pt'
  img.style['border-radius'] = '50%';
  img.className = 'rejoinder-popout';
  img.style['z-index'] = 1;
  span.appendChild(img);
  var txt = document.createElement('span');
  txt.style.position = 'absolute';
  txt.style['z-index'] = 2;
  txt.innerText = data.m;
  txt.className = 'rejoinder-popout';
  span.appendChild(txt);
  target.appendChild(span);
  console.log(span)

  // fade
  setTimeout(() => {
    console.log('fading...')
    txt.className = 'rejoinder-hide';
    img.className = 'rejoinder-hide';
    span.style.transition = '.8s';
    setTimeout(() => {
      txt.style.opacity = 0;
      img.style.opacity = 0;
    }, 750);
    span.style.top = '96%'
  }, 3000); //*/

  // remove element
  setTimeout(() => {
    span.remove();
  }, 5000);
}

function connect(user) {

  var meeting_id = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
  console.log('connecting', user.name, 'to', meeting_id);
  let ws_server = "ws://localhost:8765/ws/"+meeting_id; // "wss://rejoinder.kered.org/ws/"+meeting_id;
  var ws = new WebSocket(ws_server);

  function on_keypress(event) {
    if (document.activeElement.tagName==='TEXTAREA') return;
    var n = parseInt(event.key);
    if (!isNaN(n)) {
      var msg = {'m':emojis[n]};
      ws.send(JSON.stringify(msg))
    }
  }

  ws.onmessage = function (event) {
    display(meeting_id, JSON.parse(event.data))
  }

  ws.onerror = (e) => {
    console.log('onerror', e)
    ws.close();
  };

  ws.onclose = () => {
    console.log('onclose')
    document.removeEventListener("keypress", on_keypress)
    setTimeout(() => {
      connect(user);
    }, 1000);
  };

  ws.onopen = () => {
    console.log('... connection established')
    ws.send(JSON.stringify(user));
    listener = document.addEventListener("keypress", on_keypress);
    
  }
  return ws;
}

let ws = connect(user);

function send(s) {
  var msg = {'m':s};
  ws.send(JSON.stringify(msg))
}

function init_ui() {
  console.log('init_ui')
  var node = Array.from(document.getElementsByClassName('google-material-icons')).find(el => el.textContent === 'call_end');
  if (!node) {
    setTimeout(init_ui, 1000);
    return;
  }
  node = Array.from(document.getElementsByClassName('google-material-icons')).find(el => el.textContent === 'more_vert');
  console.log('node', node)
  while (node) {
    console.log(node)
    if (window.getComputedStyle(node.parentElement)['align-items']==='center') break;
    node = node.parentElement;
  }
  if (!node) {
    setTimeout(init_ui, 1000);
    return;
  }
  console.log('found ', node)
  var emoji_button = node.cloneNode(true);
  [...emoji_button.getElementsByClassName('google-material-icons')].find(el => el.textContent === 'more_vert').innerText = 'insert_emoticon'
  emoji_button.querySelectorAll('button').forEach(b => {
    b.removeAttribute('jsname');
    b.removeAttribute('jsaction');
    b.removeAttribute('jscontroller');
  });
  emoji_button.querySelectorAll('div').forEach(b => {
    b.removeAttribute('jsname');
    b.removeAttribute('jsaction');
    b.removeAttribute('jscontroller');
  });
  var emoji_menu = document.createElement('div');
  emoji_menu.style.position = 'absolute';
  emoji_menu.style.top = '-20pt';
  emoji_menu.style.marginLeft = '-140pt';
  emoji_menu.style.display = 'none';
  emojis.map((s, i) => {
    var b = document.createElement('span');
    b.innerText = s;
    b.style.cursor = 'pointer';
    b.style.margin = '.4em';
    b.style.fontSize = '20pt';
    b.title = "Hotkey: "+i;
    b.onclick = () => send(s);
    emoji_menu.appendChild(b);
  });
  emoji_menu.appendChild(emoji_menu.children[0]); // move "0" to the end of the list (to match keyboard)
  function toggle() {
    emoji_menu.style.display = emoji_menu.style.display=='none' ? 'block' : 'none';
  }
  emoji_button.prepend(emoji_menu)
  emoji_button.querySelector('button').onclick = toggle;
  node.parentElement.insertBefore(emoji_button, node.parentElement.children[3]);
}

init_ui();
