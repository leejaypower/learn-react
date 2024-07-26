import React from "react";
import { formatRelativeDate } from "../src/helpers";

const List = ({
  // props
  data = [],
  onClick,
  hasIndex = false,
  hasDate = false,
  onRemove,
}) => {
  const handleClickRemoveHistory = (event, keyword) => {
    event.stopPropagation();
    onRemove(keyword);
  };

  return (
    <ul className="list">
      {data.map((item, index) => {
        return (
          <li key={item.id} onClick={() => onClick(item.keyword)}>
            {hasIndex && <span className="number">{index + 1}</span>}
            <span>{item.keyword}</span>
            {hasDate && (
              <span className="date">{formatRelativeDate(item.date)}</span>
            )}
            {!!onRemove && (
              <button
                className="btn-remove"
                onClick={(event) =>
                  handleClickRemoveHistory(event, item.keyword)
                }
              ></button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;

// export default class List extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       data: [],
//     };
//   }

//   renderItem(item, index) {
//     throw "renderItem()을 구현하세요.";
//   }

//   render() {
//     return (
//       <ul className="list">
//         {this.state.data.map((item, index) => {
//           return (
//             <li key={item.id} onClick={() => this.props.onClick(item.keyword)}>
//               {this.renderItem(item, index)}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   }
// }
