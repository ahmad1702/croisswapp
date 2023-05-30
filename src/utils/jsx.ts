/* eslint-disable @typescript-eslint/restrict-template-expressions */

const jsxPropsToJSON = (jsx: string): string => {
  const regex = /([\w.:-]+)(\s*=\s*)(?:\{(.+?)\}|(".*?")(?<!\\")|(\w+))/gs;
  let match = regex.exec(jsx);
  const json: Record<string, unknown> = {};

  while (match) {
    const [_, initKey, __, initValue] = match;
    if (!initKey || !initValue) {
      break;
    }
    const key = initKey as unknown as string;
    const value = initValue as unknown as string;
    json[key] = value.startsWith("{")
      ? JSON.parse(value)
      : value.replace(/^("|')|("|')$/g, "");
    match = regex.exec(jsx);
  }
  return (
    "{\n" +
    Object.keys(json)
      .map((key) => `\t${key}: ${json[key]}`)
      .join(", \n") +
    "\n}"
  );
};

export function jsxToJson(jsxString: string): string | null {
  try {
    let firstSpace = jsxString.trim().indexOf(" ");
    const firstBracket = jsxString.trim().indexOf(">");
    const firstSlash = jsxString.trim().indexOf("/");
    const firstNewLine = jsxString.trim().indexOf("\n");

    if (firstSpace === -1) {
      firstSpace = jsxString.length;
    } else if (firstBracket !== -1 && firstBracket < firstSpace) {
      firstSpace = firstBracket;
    } else if (firstSlash !== -1 && firstSlash < firstSpace) {
      firstSpace = firstSlash;
    } else if (firstNewLine !== -1 && firstNewLine < firstSpace) {
      firstSpace = firstNewLine;
    } else if (firstSpace === 0) {
      return null;
    }
    const elementName = jsxString.trim().slice(1, firstSpace);

    if (elementName === "") {
      return null;
    }

    const propsString = jsxPropsToJSON(jsxString);

    const propVariableName = `${elementName[0]!.toLowerCase()}${elementName.slice(
      1
    )}Props`;

    const finalStr =
      `const ${propVariableName} = ` +
      propsString +
      `;\n\nreturn (\n\t<${elementName} {...${propVariableName}} />\n);`;
    console.log("final:", finalStr);
    return finalStr;
  } catch (error) {}
  return null;
}

export function jsonToJSX(jsonString: string): string | null {
  try {
    const props = JSON.parse(jsonString) as Record<string, unknown>;
    const propsString = Object.entries(props)
      .map(([key, value]) => `\t${key}={${JSON.stringify(value)}}\n`)
      .join(" ");

    const formattedStr = "<MyComponent\n" + propsString + "/>\n";
    console.log(formattedStr);
    return formattedStr;
  } catch (error) {}

  return null;
}
