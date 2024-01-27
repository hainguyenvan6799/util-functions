new Date().toLocaleDateString('en-CA')

type TimePart = { type: string, value: string };

export function formatDateTimeForKintone(isoDateTime: string) {
  const lang = 'en';
  const formatter = createDateTimeFormatter(lang);
  const timeParts = getFormattedTimeParts(formatter, isoDateTime);
  const timePartsObj = convertTimePartsToObject(timeParts);
  const kintoneTimeFormat = getKintoneTimeFormat(lang);
  return replaceTimeParts(timePartsObj, kintoneTimeFormat);
}

function createDateTimeFormatter(lang: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    year: 'numeric',
    month: lang === 'en' ? 'long' : '2-digit',
    hour: '2-digit',
    minute: 'numeric',
    timeZone: 'Asia/Tokyo',
    hour12: true,
  });
}

function getFormattedTimeParts(formatter: Intl.DateTimeFormat, isoDateTime: string) {
  return formatter.formatToParts(new Date(isoDateTime));
}

function getKintoneTimeFormat(lang: string) {
  const kintoneTimeFormats: Record<string, string> = {
    en: '{{MONTH}} {{DAY}}, {{YEAR}} {{HOUR}}:{{MINUTE}} {{DAY_PERIOD}}',
    ja: '{{YEAR}}-{{MONTH}}-{{DAY}} {{HOUR}}:{{MINUTE}} {{DAY_PERIOD}}',
    zh: '{{YEAR}}-{{MONTH}}-{{DAY}} {{HOUR}}:{{MINUTE}} {{DAY_PERIOD}}',
  };
  return kintoneTimeFormats[lang];
}

function convertTimePartsToObject(arr: TimePart[]) {
  return arr.reduce((result: Record<string, string>, item) => {
    if (item.type === 'literal') return result;
    result[item.type] = item.value;
    return result;
  }, {});
}

function replaceTimeParts(timeParts: Record<string, string>, timeFormat: string) {
  return timeFormat.replace('{{MONTH}}', timeParts.month)
    .replace('{{DAY}}', timeParts.day)
    .replace('{{YEAR}}', timeParts.year)
    .replace('{{HOUR}}', timeParts.hour)
    .replace('{{MINUTE}}', timeParts.minute)
    .replace('{{DAY_PERIOD}}', timeParts.dayPeriod);
}

