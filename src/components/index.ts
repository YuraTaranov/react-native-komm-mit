export {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  Keyboard,
  Linking,
  PermissionsAndroid,
  Pressable,
  KeyboardAvoidingView,
  PixelRatio,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// BEHAVIOR

// DATAVIEW
export {default as LocalitiesList} from './dataview/LocalitiesList';

// BUTTONS

// INPUTS

// LAYOUT
export {default as Loader} from './layout/Loader';
export {default as Wrapper} from './layout/Wrapper';

// NAVIGATION
export {default as HeaderBackButton} from './navigation/HeaderBackButton';

// TYPOGRAPHY
export {default as Icon} from './typography/Icon';
export {default as Text} from './typography/Text';
export {default as TextInput} from './typography/TextInput';

// CONTROL
export {default as VideoPlayer} from './control/VideoPlayer';
export {default as AudioPlayer} from './control/AudioPlayer';
export {default as BottomSheet} from './control/BottomSheet';
export {default as UseMyLocation} from './control/UseMyLocation';
export {default as TabBar} from './control/TabBar';
export {default as Button} from './control/Button';

// MODULES
export {default as moment} from 'moment';
export {default as DropShadow} from 'react-native-drop-shadow';
export {default as Image} from 'react-native-fast-image';
export {default as Geolocation} from 'react-native-geolocation-service';
export {PERMISSIONS, request as PermissionsRequest, check as PermissionsCheck, RESULTS as PermissionsResults} from 'react-native-permissions';
export {default as BS, BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet'
export {default as SnapCarousel, Pagination} from 'react-native-snap-carousel';
export {default as YoutubePlayer} from "react-native-youtube-iframe";
// export {default as Slider} from "@react-native-community/slider";
export {Slider} from '@miblanchard/react-native-slider';
export {default as ImageViewer} from 'react-native-image-zoom-viewer-fixed';
export {default as Modal} from 'react-native-modal';
export {default as NetInfo} from "@react-native-community/netinfo";
export {default as MapView} from "react-native-map-clustering";
export { Marker, PROVIDER_GOOGLE } from "react-native-maps";
export { default as MapViewDirections } from "react-native-maps-directions";
export {default as TrackPlayer, State as AudioPlayerState, Capability as AudioPlayerCapability, useProgress as usePlayerProgress, RepeatMode as PlayerRepeatMode, usePlaybackState} from 'react-native-track-player';
export {default as Geocoder} from 'react-native-geocoding'
export { createFilter } from 'react-native-search-filter'
export {default as Swipeable} from 'react-native-gesture-handler/Swipeable';

//MODALS
export {default as NoInternetModal} from './modal/NoInternetModal';
