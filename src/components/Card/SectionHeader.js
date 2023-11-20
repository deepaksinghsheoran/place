import React from "react";


function SectionHeader(props) {
    // Render nothing if no title or subtitle
    if (!props.headin && !props.title && !props.subtitle) {
      return null;
    }
  
    return (
      <header
        className={
          "SectionHeader" + (props.className ? ` ${props.className}` : "" )
        }
      >
        {props.headin && (
          <p className="SectionHeader__headin" style={props.headinStyle}>{props.headin}</p>
        )}
  
        {props.shouldApplyMarginTop && <hr style={{ margin: '1rem 0' }} />}
        {props.title && (
          <h1
            className={
              "font-weight-bold" +
              (props.subtitle && props.spaced ? " mb-4" : "") +
              (!props.subtitle ? " mb-0" : "") +
              (props.size ? ` h${props.size}` : "")
            }
            style={{
              ...props.titleStyle
              // , marginTop: props.shouldApplyMarginTop ? '4rem' : null
            }}
  
          >
            {props.title}
          </h1>
        )}
        {props.shouldApplyMarginTop && <hr style={{ margin: '1rem 0' }} />}
  
  
        {props.h3title && (
          <h5 className="download_title" style={{...props.h3titleStyle, margin: "1rem 0",}}>{props.h3title}</h5>
        )}
  
        {props.subtitle && (
          <p className="SectionHeader__subtitle" style={props.subtitleStyle}>{props.subtitle}</p>
        )}
  
        
      </header>
    );
  }
  
  export default SectionHeader;
  