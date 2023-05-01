// export function jsx(
//   type: string | Function,
//   props: Record<string, any>,
//   ...children: any[]
// ): VNode {
//   return {
//     type,
//     props,
//     children,
//   };
// }

export function jsxToJson(jsxString: string): string | null {
  const firstSpace = jsxString.trim().indexOf(" ");
  const elementName = jsxString.trim().slice(0, firstSpace);

  if (elementName === "") {
    return null;
  }

  const propsString = jsxString.trim().slice(firstSpace + 1);
  const props = propsString
    .split(" ")
    .map((prop) => {
      const [key, value] = prop.split("=");
      return { key, value };
    })
    .reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  return JSON.stringify({ elementName, props });
  return jsxString.replace(
    /(\w+)="([^"]+)"/g,
    (match, p1: string, p2: string) => {
      return `${p1}: "${p2}"`;
    }
  );
}

export function jsonToJSX(jsonString: string): string {
  while (jsonString.includes(":")) {
    jsonString = jsonString.replace(
      /(\w+): "([^"]+)"/g,
      (match, p1: string, p2: string) => {
        return `${p1}="${p2}"`;
      }
    );
  }
  return jsonString;
}
