function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var r=require("react-admin"),t=e(require("path-browserify"));require("firebase/firestore"),require("firebase/storage");var n=e(require("firebase/app"));require("firebase/auth");const o=function(){function e(){}return e.prototype.then=function(r,t){const n=new e,o=this.s;if(o){const e=1&o?r:t;if(e){try{i(n,1,e(this.v))}catch(e){i(n,2,e)}return n}return this}return this.o=function(e){try{const o=e.v;1&e.s?i(n,1,r?r(o):o):t?i(n,1,t(o)):i(n,2,o)}catch(e){i(n,2,e)}},n},e}();function i(e,r,t){if(!e.s){if(t instanceof o){if(!t.s)return void(t.o=i.bind(null,e,r));1&r&&(r=t.s),t=t.v}if(t&&t.then)return void t.then(i.bind(null,e,r),i.bind(null,e,2));e.s=r,e.v=t;const n=e.o;n&&n(e)}}function a(e,r){try{var t=e()}catch(e){return r(e)}return t&&t.then?t.then(void 0,r):t}function s(e,r,t){e.sort(function(e,n){var o,i,a=e[r],s=n[r];return Number.isFinite(a)&&Number.isFinite(s)?(o=a,i=s):(o=(e[r]||"").toString().toLowerCase(),i=(n[r]||"").toString().toLowerCase()),o>i?"asc"===t?1:-1:o<i?"asc"===t?-1:1:0})}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var u=function(){this.title="🔥r-a-f: "},c={log:{configurable:!0},warn:{configurable:!0},error:{configurable:!0}};u.prototype.isEnabled=function(){return!!localStorage.getItem("LOGGING_ENABLED")},c.log.get=function(){return this.isEnabled()?console.log.bind(console,this.title):function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r]}},c.warn.get=function(){return this.isEnabled()?console.warn.bind(console,this.title):function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r]}},c.error.get=function(){return this.isEnabled()?console.error.bind(console,this.title):function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r]}},Object.defineProperties(u.prototype,c);var l=new u;function f(e,r){e&&e.debug||r.logging?localStorage.setItem("LOGGING_ENABLED","true"):localStorage.removeItem("LOGGING_ENABLED")}var h=l.log,d=l.error;function p(e,r){if(!e)return r;if(!r)throw new Error("Resource name must be a string of length greater than 0 characters");var n=t.join("/",e,"/",r,"/");if((n.split("/").length-1)%2)throw new Error('The rootRef path must point to a "document" not a "collection"\ne.g. /collection/document/ or /collection/document/collection/document/');return n.slice(1,-1)}var v=function(e,r){this.fireWrapper=e,this.options=r,this.resources={},this.db=e.db()};v.prototype.GetResource=function(e){var r=this.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r},v.prototype.TryGetResourcePromise=function(e,r){try{var t=this;return h("resourceManager.TryGetResourcePromise",{relativePath:e,collectionQuery:r}),Promise.resolve(t.initPath(e,r)).then(function(){var r=t.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r})}catch(e){return Promise.reject(e)}},v.prototype.RefreshResource=function(e,r){try{var t=this;return h("resourceManager.RefreshResource",{relativePath:e,collectionQuery:r}),Promise.resolve(t.initPath(e,r)).then(function(){var n=t.resources[e],o=n.collection,i=t.applyQuery(o,r);return Promise.resolve(i.get()).then(function(e){n.list=e.docs.map(function(e){return t.parseFireStoreDocument(e)}),h("resourceManager.RefreshResource",{newDocs:e,resource:n,collectionPath:o.path})})})}catch(e){return Promise.reject(e)}},v.prototype.GetSingleDoc=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e)).then(function(){var n=t.resources[e];return Promise.resolve(n.collection.doc(r).get()).then(function(o){if(!o.exists)throw new Error("react-admin-firebase: No id found matching: "+r);var i=t.parseFireStoreDocument(o);return h("resourceManager.GetSingleDoc",{relativePath:e,resource:n,docId:r,docSnap:o,result:i}),i})})}catch(e){return Promise.reject(e)}},v.prototype.initPath=function(e,r){try{var t=this,n=p(t.options.rootRef,e);return Promise.resolve(t.isCollectionAccessible(n,r)).then(function(r){var o=!!t.resources[e];if(h("resourceManager.initPath()",{absolutePath:n,isAccessible:r,hasBeenInited:o}),!r&&o)return h("resourceManager.initPath() not accessible, removing resource..."),void t.removeResource(e);if(o)h("resourceManager.initPath() has been initialized already...");else{var i=t.db.collection(n),a={collection:i,list:[],path:e,pathAbsolute:n};t.resources[e]=a,h("resourceManager.initPath() setting resource...",{resource:a,allResources:t.resources,collection:i,collectionPath:i.path})}})}catch(e){return Promise.reject(e)}},v.prototype.parseFireStoreDocument=function(e){var r=e.data();return Object.keys(r).forEach(function(e){var t=r[e];t&&t.toDate&&t.toDate instanceof Function&&(r[e]=t.toDate())}),Object.assign({},{id:e.id},r)},v.prototype.getUserLogin=function(){try{var e=this;return new Promise(function(r,t){e.fireWrapper.auth().onAuthStateChanged(function(e){r(e)})})}catch(e){return Promise.reject(e)}},v.prototype.isCollectionAccessible=function(e,r){try{var t=!1,n=this,o=a(function(){var t=n.db.collection(e),o=n.applyQuery(t,r);return Promise.resolve(o.limit(1).get()).then(function(){})},function(){return t=!0,!1});return o&&o.then?o.then(function(e){return!t||e}):!t||o}catch(e){return Promise.reject(e)}},v.prototype.removeResource=function(e){delete this.resources[e]},v.prototype.applyQuery=function(e,r){var t;return t=r?r(e):e,h("resourceManager.applyQuery() ...",{collection:e,collectionQuery:(r||"-").toString(),collref:t}),t};var m=function(e,r){this.fireWrapper=e,this.options=r,this.db=e.db(),this.rm=new v(this.fireWrapper,this.options)};m.prototype.apiGetList=function(e,r){try{h("apiGetList",{resourceName:e,params:r});var t=r.filter.collectionQuery;return delete r.filter.collectionQuery,Promise.resolve(this.tryGetResource(e,"REFRESH",t)).then(function(e){var t=e.list;if(null!=r.sort){var n=r.sort;s(t,n.field,"ASC"===n.order?"asc":"desc")}var o=function(e,r){if(!(t=r)||"{}"===JSON.stringify(t))return e;var t,n=Object.keys(r).map(function(e){return{name:e,value:(r[e]||"").toLowerCase()}});return e.filter(function(e){return n.reduce(function(r,t){return function(e,r,n){var o=e[t.name];return"string"==typeof o&&o.toString().toLowerCase().includes(n.toLowerCase())}(e,0,t.value)&&r},!0)})}(t,r.filter),i=(r.pagination.page-1)*r.pagination.perPage;return{data:o.slice(i,i+r.pagination.perPage),total:o.length}})}catch(e){return Promise.reject(e)}},m.prototype.apiGetOne=function(e,r){try{var t=this;return h("apiGetOne",{resourceName:e,params:r}),a(function(){return Promise.resolve(t.rm.GetSingleDoc(e,r.id)).then(function(e){return{data:e}})},function(){throw new Error("Error getting id: "+r.id+" from collection: "+e)})}catch(e){return Promise.reject(e)}},m.prototype.apiCreate=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){var o=!1;function i(e){if(o)return e;var i=t.db.collection("collections").doc().id;return Promise.resolve(t.parseDataAndUpload(n,i,r.data)).then(function(e){var r=Object.assign({},e);return t.checkRemoveIdField(r),Promise.resolve(t.addCreatedByFields(r)).then(function(){return Promise.resolve(t.addUpdatedByFields(r)).then(function(){return Promise.resolve(n.collection.doc(i).set(r,{merge:!1})).then(function(){return{data:Object.assign({},e,{id:i})}})})})})}h("apiCreate",{resourceName:e,resource:n,params:r});var a=r.data&&r.data.id;h("apiCreate",{hasOverridenDocId:a});var s=function(){if(a){var e=r.data.id;return Promise.resolve(n.collection.doc(e).get()).then(function(i){if(i.exists)throw new Error('the id:"'+e+"\" already exists, please use a unique string if overriding the 'id' field");return Promise.resolve(t.parseDataAndUpload(n,e,r.data)).then(function(r){if(!e)throw new Error("id must be a valid string");var i=Object.assign({},r);return t.checkRemoveIdField(i),Promise.resolve(t.addCreatedByFields(i)).then(function(){return Promise.resolve(t.addUpdatedByFields(i)).then(function(){return h("apiCreate",{docObj:i}),Promise.resolve(n.collection.doc(e).set(i,{merge:!1})).then(function(){return o=!0,{data:Object.assign({},r,{id:e})}})})})})})}}();return s&&s.then?s.then(i):i(s)})}catch(e){return Promise.reject(e)}},m.prototype.apiUpdate=function(e,r){try{var t=this,n=r.id;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(o){return h("apiUpdate",{resourceName:e,resource:o,params:r}),Promise.resolve(t.parseDataAndUpload(o,n,r.data)).then(function(e){var r=Object.assign({},e);return t.checkRemoveIdField(r),Promise.resolve(t.addUpdatedByFields(r)).then(function(){return o.collection.doc(n).update(r).catch(function(e){d("apiUpdate error",{error:e})}),{data:Object.assign({},e,{id:n})}})})})}catch(e){return Promise.reject(e)}},m.prototype.apiUpdateMany=function(e,r){try{var t=this;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(n){return h("apiUpdateMany",{resourceName:e,resource:n,params:r}),Promise.resolve(Promise.all(r.ids.map(function(e){try{return Promise.resolve(t.parseDataAndUpload(n,e,r.data)).then(function(r){var o=Object.assign({},r);return t.checkRemoveIdField(o),Promise.resolve(t.addUpdatedByFields(o)).then(function(){return n.collection.doc(e).update(o).catch(function(e){d("apiUpdateMany error",{error:e})}),Object.assign({},r,{id:e})})})}catch(e){return Promise.reject(e)}}))).then(function(e){return{data:e}})})}catch(e){return Promise.reject(e)}},m.prototype.apiDelete=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){return h("apiDelete",{resourceName:e,resource:t,params:r}),t.collection.doc(r.id).delete().catch(function(e){d("apiDelete error",{error:e})}),{data:r.previousData}})}catch(e){return Promise.reject(e)}},m.prototype.apiDeleteMany=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){h("apiDeleteMany",{resourceName:e,resource:n,params:r});for(var o=[],i=t.db.batch(),a=0,s=r.ids;a<s.length;a+=1){var u=s[a];i.delete(n.collection.doc(u)),o.push({id:u})}return i.commit().catch(function(e){d("apiDeleteMany error",{error:e})}),{data:o}})}catch(e){return Promise.reject(e)}},m.prototype.apiGetMany=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){return h("apiGetMany",{resourceName:e,resource:t,params:r}),Promise.resolve(Promise.all(r.ids.map(function(e){return t.collection.doc(e).get()}))).then(function(e){return{data:e.map(function(e){return Object.assign({},e.data(),{id:e.id})})}})})}catch(e){return Promise.reject(e)}},m.prototype.apiGetManyReference=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){h("apiGetManyReference",{resourceName:e,resource:t,params:r});var n=r.target,o=r.id,i=t.list.filter(function(e){return e[n]===o});if(null!=r.sort){var a=r.sort;s(i,a.field,"ASC"===a.order?"asc":"desc")}var u=(r.pagination.page-1)*r.pagination.perPage;return{data:i.slice(u,u+r.pagination.perPage),total:i.length}})}catch(e){return Promise.reject(e)}},m.prototype.tryGetResource=function(e,r,t){try{var n=this;function o(){return n.rm.TryGetResourcePromise(e,t)}var i=function(){if(r)return Promise.resolve(n.rm.RefreshResource(e,t)).then(function(){})}();return i&&i.then?i.then(o):o()}catch(e){return Promise.reject(e)}},m.prototype.getCurrentUserEmail=function(){try{return Promise.resolve(this.rm.getUserLogin()).then(function(e){return e?e.email:"annonymous user"})}catch(e){return Promise.reject(e)}},m.prototype.parseDataAndUpload=function(e,r,t){try{var n=this;if(!t)return t;var o=e.collection.doc(r).path;return Promise.resolve(Promise.all(Object.keys(t).map(function(e){try{var r=t[e],i=function(){if(r.hasOwnProperty("rawFile"))return Promise.resolve(n.parseDataField(r,o,e)).then(function(r){t[e]=r})}();return Promise.resolve(i&&i.then?i.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}))).then(function(){return t})}catch(e){return Promise.reject(e)}},m.prototype.checkRemoveIdField=function(e){this.options.dontAddIdFieldToDoc&&delete e.id},m.prototype.addCreatedByFields=function(e){try{var r=this;if(r.options.disableMeta)return;return Promise.resolve(r.getCurrentUserEmail()).then(function(t){e.createdate=r.fireWrapper.serverTimestamp(),e.createdby=t})}catch(e){return Promise.reject(e)}},m.prototype.addUpdatedByFields=function(e){try{var r=this;if(r.options.disableMeta)return;return Promise.resolve(r.getCurrentUserEmail()).then(function(t){e.lastupdate=r.fireWrapper.serverTimestamp(),e.updatedby=t})}catch(e){return Promise.reject(e)}},m.prototype.parseDataField=function(e,r,t){try{if(!e||!e.hasOwnProperty("rawFile"))return;return Promise.resolve(this.uploadAndGetLink(e.rawFile,r,t))}catch(e){return Promise.reject(e)}},m.prototype.uploadAndGetLink=function(e,r,n){try{var o=t.join(r,n);return Promise.resolve(this.saveFile(o,e))}catch(e){return Promise.reject(e)}},m.prototype.saveFile=function(e,r){try{h("saveFile() saving file...",{storagePath:e,rawFile:r});var t=this.fireWrapper.storage().ref(e).put(r);return a(function(){return Promise.resolve(new Promise(function(e,r){return t.then(e).catch(r)})).then(function(r){return Promise.resolve(r.ref.getDownloadURL()).then(function(t){return h("saveFile() saved file",{storagePath:e,taskResult:r,getDownloadURL:t}),t})})},function(e){d("storage/unknown"===e.code?'saveFile() error saving file, No bucket found! Try clicking "Get Started" in firebase -> storage':"saveFile() error saving file",{storageError:e})})}catch(e){return Promise.reject(e)}};var g,y=function(){};y.prototype.init=function(e,r){this.app=function(e,r){return r.app?r.app:n.apps.length?n.app():n.initializeApp(e)}(e,r),this.firestore=this.app.firestore()},y.prototype.db=function(){return this.firestore},y.prototype.serverTimestamp=function(){return new Date},y.prototype.auth=function(){return this.app.auth()},y.prototype.storage=function(){return this.app.storage()};var P=function(e,r){var t=r||{};h("Auth Client: initializing...",{firebaseConfig:e,options:t});var n=new y;n.init(e,t),this.auth=n.auth(),this.setPersistence(t.persistence)};P.prototype.setPersistence=function(e){var r;switch(e){case"local":r=n.auth.Auth.Persistence.LOCAL;break;case"none":r=n.auth.Auth.Persistence.NONE;break;case"session":default:r=n.auth.Auth.Persistence.SESSION}h("setPersistence",{persistenceInput:e,persistenceResolved:r}),this.auth.setPersistence(r).catch(function(e){return console.error(e)})},P.prototype.HandleAuthLogin=function(e){try{var r=this,t=e.username,n=e.password;return t&&n?a(function(){return Promise.resolve(r.auth.signInWithEmailAndPassword(t,n)).then(function(e){return h("HandleAuthLogin: user sucessfully logged in",{user:e}),e})},function(){throw h("HandleAuthLogin: invalid credentials",{params:e}),new Error("Login error: invalid credentials")}):r.getUserLogin()}catch(e){return Promise.reject(e)}},P.prototype.HandleAuthLogout=function(){return this.auth.signOut()},P.prototype.HandleAuthError=function(e){h("HandleAuthLogin: invalid credentials",{errorHttp:e});var r=!!e&&e.status;return 409===r||200===r?Promise.resolve("API is authenticated"):Promise.reject("Recieved authentication error from API")},P.prototype.HandleAuthCheck=function(){return this.getUserLogin()},P.prototype.getUserLogin=function(){var e=this;return new Promise(function(r,t){if(e.auth.currentUser)return r(e.auth.currentUser);var n=e.auth.onAuthStateChanged(function(e){n(),e?r(e):t()})})},P.prototype.HandleGetPermissions=function(){try{var e=this;return a(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.claims})})},function(e){return h("HandleGetPermission: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},P.prototype.HandleGetJWTAuthTime=function(){try{var e=this;return a(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.authTime})})},function(e){return h("HandleGetJWTAuthTime: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},P.prototype.HandleGetJWTExpirationTime=function(){try{var e=this;return a(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.expirationTime})})},function(e){return h("HandleGetJWTExpirationTime: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},P.prototype.HandleGetJWTSignInProvider=function(){try{var e=this;return a(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.signInProvider})})},function(e){return h("HandleGetJWTSignInProvider: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},P.prototype.HandleGetJWTIssuedAtTime=function(){try{var e=this;return a(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.issuedAtTime})})},function(e){return h("HandleGetJWTIssuedAtTime: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},P.prototype.HandleGetJWTToken=function(){try{var e=this;return a(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.token})})},function(e){return h("HandleGetJWTIssuedAtTime: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},exports.FirebaseDataProvider=function(e,t){var n=t||{};!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider");r.rootRef&&p(r.rootRef,"test")}(e,n),f(e,n),h("react-admin-firebase:: Creating FirebaseDataProvider",{firebaseConfig:e,options:n});var s=new y;return s.init(e,t),g=new m(s,n),function(e,t,n){try{var s;return h("FirebaseDataProvider: event",{type:e,resourceName:t,params:n}),Promise.resolve(a(function(){var a=function(e,r){var t,n=-1;e:{for(var a=0;a<r.length;a++){var s=r[a][0];if(s){var u=s();if(u&&u.then)break e;if(u===e){n=a;break}}else n=a}if(-1!==n){do{for(var c=r[n][1];!c;)c=r[++n][1];var l=c();if(l&&l.then){t=!0;break e}var f=r[n][2];n++}while(f&&!f());return l}}const h=new o,d=i.bind(null,h,2);return(t?l.then(p):u.then(function t(o){for(;;){if(o===e){n=a;break}if(++a===r.length){if(-1!==n)break;return void i(h,1,c)}if(s=r[a][0]){if((o=s())&&o.then)return void o.then(t).then(void 0,d)}else n=a}do{for(var u=r[n][1];!u;)u=r[++n][1];var c=u();if(c&&c.then)return void c.then(p).then(void 0,d);var l=r[n][2];n++}while(l&&!l());i(h,1,c)})).then(void 0,d),h;function p(e){for(;;){var t=r[n][2];if(!t||t())break;for(var o=r[++n][1];!o;)o=r[++n][1];if((e=o())&&e.then)return void e.then(p).then(void 0,d)}i(h,1,e)}}(e,[[function(){return r.GET_MANY},function(){return Promise.resolve(g.apiGetMany(t,n)).then(function(e){s=e})}],[function(){return r.GET_MANY_REFERENCE},function(){return Promise.resolve(g.apiGetManyReference(t,n)).then(function(e){s=e})}],[function(){return r.GET_LIST},function(){return Promise.resolve(g.apiGetList(t,n)).then(function(e){s=e})}],[function(){return r.GET_ONE},function(){return Promise.resolve(g.apiGetOne(t,n)).then(function(e){s=e})}],[function(){return r.CREATE},function(){return Promise.resolve(g.apiCreate(t,n)).then(function(e){s=e})}],[function(){return r.UPDATE},function(){return Promise.resolve(g.apiUpdate(t,n)).then(function(e){s=e})}],[function(){return r.UPDATE_MANY},function(){return Promise.resolve(g.apiUpdateMany(t,n)).then(function(e){s=e})}],[function(){return r.DELETE},function(){return Promise.resolve(g.apiDelete(t,n)).then(function(e){s=e})}],[function(){return r.DELETE_MANY},function(){return Promise.resolve(g.apiDeleteMany(t,n)).then(function(e){s=e})}],[void 0,function(){throw new Error('Unknkown dataprovider command type: "'+e+'"')}]]);return a&&a.then?a.then(function(e){return s}):s},function(e){throw{status:409,message:e.toString(),json:s}}))}catch(e){return Promise.reject(e)}}},exports.FirebaseAuthProvider=function(e,r){!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider")}(e,r);var t=new P(e,r);return f(e,r),{login:function(e){return t.HandleAuthLogin(e)},logout:function(){return t.HandleAuthLogout()},checkAuth:function(){return t.HandleAuthCheck()},checkError:function(e){return t.HandleAuthError(e)},getPermissions:function(){return t.HandleGetPermissions()},getJWTAuthTime:function(){return t.HandleGetJWTAuthTime()},getJWTExpirationTime:function(){return t.HandleGetJWTExpirationTime()},getJWTSignInProvider:function(){return t.HandleGetJWTSignInProvider()},getJWTClaims:function(){return t.HandleGetPermissions()},getJWTToken:function(){return t.HandleGetJWTToken()}}};
//# sourceMappingURL=index.js.map
