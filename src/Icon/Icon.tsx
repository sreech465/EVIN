import React from 'react';
import { Image, ImageProps,View } from 'react-native';
import { Badge } from 'react-native-elements'
import { widthToDp } from '../responsive';
import { appStyle } from '../styles/styles';

const getIconStyle = (size?: IconProps['size']) => {
  if (size === 'sm') return { width: 24, height: 24 };
  if (size === 'lg') return { width: 64, height: 64 };
  return { width: 48, height: 48 };
};

interface IconProps extends Partial<ImageProps> {
  size?: 'sm' | 'md' | 'lg';
}

export interface IconBaseProps extends ImageProps {
  size?: 'sm' | 'md' | 'lg';
}


export const Search: React.FC<Partial<ImageProps>> = props => (
 
    <Image 
    {...props} 
    
    source={require('./icons/search.png')}  />
    // {console.log(props)}
  );

  export const Menu: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/menu.png')} style={[{ resizeMode:'contain',width:'50%',height:'50%' },appStyle.centrailView]} />
  );
  export const Logo: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/menu.png')} style={[{ resizeMode:'contain',width:'50%',height:'50%' },appStyle.centrailView]} />
  );

  export const Install: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/install.png')} />
  );
  export const Project: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/projects.png')} />
  );
  export const Scan: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/scan.png')} />
  );
  export const InputSearch: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/inputSearch.png')} />
  );
  export const Filter: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/filter.png')} />
  );
  export const Document: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/document.png')} />
  );
  export const Settings: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/settings.png')} />
  );
  export const Maintenence: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/maintenence.png')} />
  );
  export const Back: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/back.png')} />
  );
  export const Pdf: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/pdf.png')} />
  );
  export const Img: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/image.png')} />
  );

  export const Xlsx: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/xlsx.png')}  style={{width:widthToDp('9'),height:widthToDp('9')}} />
  );
  export const Pptx: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/pptx.png')}  style={{width:widthToDp('9'),height:widthToDp('9')}} />
  );
  export const Mp4: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/mp4.png')}  style={{width:widthToDp('9'),height:widthToDp('9')}} />
  );

  export const LogoText: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/logo_text.png')} />
    // {console.log(...props)}

  );
  export const Doc: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/word.png')} />
  );

  export const DisableBack: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/back_disabled.png')} />
  );
  export const Forward: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/forward.png')} />
  );
  export const SpareTick: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/sparetick.png')} />
  );

  export const AddImage: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/imageadd.png')} />
  );
  export const AddFile: React.FC<Partial<ImageProps>> = props => (
    <Image {...props} source={require('./icons/fileadd.png')} />
  );



  