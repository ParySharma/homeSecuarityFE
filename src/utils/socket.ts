// import { io, Socket } from 'socket.io-client';
// import { dispatch } from '@/redux/store';
// import {
//   ACTIVEPLUGINS_STORAGE_KEY,
//   getCompanySettings,
//   getUserMeta,
//   setCompanySettings,
//   setLocalStorage,
//   setPlugins,
//   setSidemenu,
//   setUserMeta,
// } from './localStorage';
// import {
//   setActivePlugins,
//   setCompanySettingsdata,
//   setSideMenuSetting,
// } from '@/redux/slices/commonSlice';
// import {
//   setpluginDataData,
//   setsideMenuData,
//   sethealthFormData,
// } from '@/redux/slices/pluginSlice';

// const socketUrl = process.env.NEXT_PUBLIC_API_URL;
// const CHANNEL_NAME = 'socket-sync';
// const socketChannel = new BroadcastChannel(CHANNEL_NAME);

// const EVENT_TYPES = {
//   MENU_SETTING: 'menu_setting',
//   THEME_SETTING: 'theme_settings',
//   COMPANY_SETTING: 'company_setting',
//   ACTIVE_PLUGIN: 'active_plugin',
//   FORM_SETTING: 'form_setting',
//   CONNECTED: 'CONNECTED',
//   DISCONNECTED: 'DISCONNECTED',
// };

// type EventData = {
//   data: any;
// };

// const SocketService = (() => {
//   let socket: Socket | null = null;

//   const connect = (userId: string) => {
//     if (socket) {
//       // console.warn('Socket already connected.');
//       return;
//     }

//     socket = io(socketUrl, {
//       query: { user_id: userId },
//       transports: ['polling'],
//     });

//     socket.on('connect', () => {
//       console.log('Connected to Socket...!!!');
//       socketChannel.postMessage({
//         type: EVENT_TYPES.CONNECTED,
//         id: socket?.id,
//       });
//     });

//     socket.on(EVENT_TYPES.MENU_SETTING, (data) =>
//       handleEvent(EVENT_TYPES.MENU_SETTING, data, true)
//     );
//     socket.on(EVENT_TYPES.THEME_SETTING, (data) =>
//       handleEvent(EVENT_TYPES.THEME_SETTING, data, true)
//     );
//     socket.on(EVENT_TYPES.COMPANY_SETTING, (data) =>
//       handleEvent(EVENT_TYPES.COMPANY_SETTING, data, true)
//     );
//     socket.on(EVENT_TYPES.ACTIVE_PLUGIN, (data) =>
//       handleEvent(EVENT_TYPES.ACTIVE_PLUGIN, data, true)
//     );
//     socket.on(EVENT_TYPES.FORM_SETTING, (data) =>
//       handleEvent(EVENT_TYPES.FORM_SETTING, data, true)
//     );
//   };

//   const disconnect = () => {
//     if (socket) {
//       socket.removeAllListeners();
//       socket.disconnect();
//       socket = null;
//       // console.log('Socket disconnected.');
//       socketChannel.postMessage({ type: EVENT_TYPES.DISCONNECTED });
//     }
//   };

//   const handleEvent = (type: string, data: EventData, broadcast: boolean) => {
//     switch (type) {
//       case EVENT_TYPES.MENU_SETTING:
//         handleMenuSettings(data, broadcast);
//         break;
//       case EVENT_TYPES.THEME_SETTING:
//         handleThemeSettings(data, broadcast);
//         break;
//       case EVENT_TYPES.COMPANY_SETTING:
//         handleCompanySettings(data, broadcast);
//         break;
//       case EVENT_TYPES.ACTIVE_PLUGIN:
//         handleActivePlugins(data, broadcast);
//         break;
//       case EVENT_TYPES.FORM_SETTING:
//         handleFormSettings(data, broadcast);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleMenuSettings = (data: EventData, broadcast: boolean) => {
//     // console.log('Menu Settings:', data.data);
//     const menuSettings = data?.data?.showmenulist;
//     if (menuSettings) {
//       if (broadcast) {
//         socketChannel.postMessage({ type: EVENT_TYPES.MENU_SETTING, data });
//       }
//       setSidemenu(menuSettings);
//       dispatch(setSideMenuSetting(menuSettings));
//       dispatch(setsideMenuData(menuSettings));
//     }
//   };

//   const handleThemeSettings = (data: EventData, broadcast: boolean) => {
//     // console.log('Theme Settings:', data.data);
//     if (broadcast) {
//       socketChannel.postMessage({ type: EVENT_TYPES.THEME_SETTING, data });
//     }
//     const userMeta = getUserMeta();
//     setUserMeta({
//       ...userMeta,
//       company: { ...userMeta.company, theme_setting: data.data },
//     });
//   };

//   const handleCompanySettings = (data: EventData, broadcast: boolean) => {
//     // console.log('Company Settings:', data.data);
//     if (broadcast) {
//       socketChannel.postMessage({ type: EVENT_TYPES.COMPANY_SETTING, data });
//     }
//     const companySettings = getCompanySettings();
//     const userMeta = getUserMeta();
//     setUserMeta({
//       ...userMeta,
//       company: {
//         ...userMeta.company,
//         setting: { ...userMeta.company.setting, ...data.data },
//       },
//     });
//     dispatch(
//       setCompanySettingsdata({ ...userMeta.company.setting, ...data.data })
//     );

//     setCompanySettings({ ...companySettings, ...data.data });
//   };

//   const handleFormSettings = (data: any, broadcast: boolean) => {
//     // console.log('Form Settings:', data.data);
//     if (broadcast) {
//       socketChannel.postMessage({ type: EVENT_TYPES.FORM_SETTING, data });
//     }
//     dispatch(sethealthFormData(data.data));
//   };

//   const handleActivePlugins = (data: EventData, broadcast: boolean) => {
//     // console.log('Plugins:', data.data);
//     if (broadcast) {
//       socketChannel.postMessage({ type: EVENT_TYPES.ACTIVE_PLUGIN, data });
//     }
//     setPlugins(data.data);
//     dispatch(setActivePlugins(data.data));
//     dispatch(setpluginDataData(data.data));
//   };

//   socketChannel.onmessage = (event) => {
//     const { type, data } = event.data;
//     handleEvent(type, data, false);
//   };

//   return { connect, disconnect, socket };
// })();

// export default SocketService;
