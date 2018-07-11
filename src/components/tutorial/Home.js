import React, {Component} from 'react';
import {Collapsible, CollapsibleItem, icon} from 'react-materialize';

const element1 = (
<Collapsible>
    <CollapsibleItem header='First' icon='filter_drama'>
    This is Home
    </CollapsibleItem>
    <CollapsibleItem header='Second' icon='place'>
    Lorem ipsum dolor sit amet.
    </CollapsibleItem>
    <CollapsibleItem header='Third' icon='whatshot'>
    Lorem ipsum dolor sit amet.
    </CollapsibleItem>
</Collapsible>
);

class Home extends Component {
    render() {
      return (
        <div>
            {element1}
        </div>
      );
    }
  }

export default Home;