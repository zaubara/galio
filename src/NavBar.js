import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

// galio components
import Block from './Block';
import Text from './atomic/ions/Text';
import Icon from './atomic/ions/Icon';
import GalioTheme, { withGalio } from './theme';

const { height } = Dimensions.get('screen');

function NavBar({
  back = false,
  hideLeft,
  hideRight,
  left = null,
  leftStyle = null,
  leftIconColor = null,
  leftHitSlop = null,
  leftIconSize,
  leftIconName,
  leftIconFamily,
  onLeftPress = () => {},
  right = null,
  rightStyle = null,
  style = null,
  styles = {},
  transparent = false,
  theme = GalioTheme,
  title = null,
  titleStyle = null,
  titleNumberOfLines,
  titleTextProps,
}) {
  function renderTitle() {
    if (typeof title === 'string') {
      return (
        <View style={styles.title}>
          <Text numberOfLines={titleNumberOfLines || 1} style={[styles.titleTextStyle, titleStyle]} {...titleTextProps}>{title}</Text>
        </View>
      );
    }

    if (!title) return null;

    return title;
  }

  function renderLeft() {
    if (!hideLeft) {
      if (leftIconName || (back && !left)) {
        return (
          <View style={[styles.left, leftStyle]}>
            <TouchableOpacity onPress={() => onLeftPress && onLeftPress()} hitSlop={leftHitSlop}>
              <Icon
                family={leftIconFamily || 'evilicons'}
                color={leftIconColor || theme.COLORS.ICON}
                size={leftIconSize || theme.SIZES.BASE * 1.0625}
                name={leftIconName || (back ? 'chevron-left' : 'navicon')}
              />
            </TouchableOpacity>
          </View>
        );
      }
      return <View style={[styles.left, leftStyle]}>{left}</View>;
    }
    return <View style={[styles.left]} />;
  }

  function renderRight() {
    const hasIcons = React.Children.count(right) > 1;
    const rightStyles = [styles.right, rightStyle];
    if (!hideRight) {
      return (
        <Block right row={hasIcons} style={rightStyles}>
          {right}
        </Block>
      );
    }
    return <View style={styles.right} />;
  }

  const navStyles = [styles.navBar, transparent && styles.transparent, style];

  return (
    <Block style={navStyles}>
      {renderLeft()}
      {renderTitle()}
      {renderRight()}
    </Block>
  );
}

NavBar.propTypes = {
  back: PropTypes.bool,
  transparent: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  titleStyle: PropTypes.any,
  left: PropTypes.node,
  leftStyle: PropTypes.any,
  leftIconColor: PropTypes.string,
  onLeftPress: PropTypes.func,
  leftHitSlop: PropTypes.any,
  right: PropTypes.node,
  rightStyle: PropTypes.any,
  style: PropTypes.any,
  styles: PropTypes.any,
  theme: PropTypes.any,
  leftIconName: PropTypes.string,
  leftIconFamily: PropTypes.string,
  hideLeft: PropTypes.bool,
  hideRight: PropTypes.bool,
};

const styles = theme =>
  StyleSheet.create({
    navBar: {
      width: 'auto',
      height: theme.SIZES.BASE * 4.125,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: theme.COLORS.WHITE,
      paddingVertical: theme.SIZES.BASE,
    },
    title: {
      flex: 2,
      height: height * 0.07,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleTextStyle: {
      fontWeight: '400',
      fontSize: theme.SIZES.FONT * 0.875,
      color: theme.COLORS.BLACK,
    },
    left: {
      flex: 0.5,
      height: height * 0.07,
      justifyContent: 'center',
      marginLeft: theme.SIZES.BASE,
    },
    right: {
      flex: 0.5,
      height: height * 0.07,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.SIZES.BASE,
    },
    transparent: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
    },
  });

export default withGalio(NavBar, styles);
