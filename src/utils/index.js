function build_tree({
  data,
  idFieldName = "value",
  parentIdFieldName = "parent_id",
  id = null,
}) {
  const rootNodes = getChildren({ data, parentId: id });

  return rootNodes.map((node) => {
    const children = build_tree({
      data,
      idFieldName,
      parentIdFieldName,
      id: node[idFieldName],
    });

    if (children.length > 0) {
      return {
        ...node,
        children,
      };
    }

    return { ...node };
  });
}

function getChildren({ data, parentIdFieldName = "parent_id", parentId }) {
  return data.filter((item) => item[parentIdFieldName] === parentId);
}

function prepareData({
  data,
  value = "id",
  title = "name",
  parent_id = "parent_id",
}) {
  return data.map((item) => ({
    value: item[value],
    title: item[title],
    parent_id: item[parent_id],
  }));
}

export function prepareAndBuildTree(data) {
  const preparedData = prepareData({ data });
  return build_tree({ data: preparedData });
}
