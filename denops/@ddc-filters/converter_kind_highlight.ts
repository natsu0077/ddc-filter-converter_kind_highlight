import {
  BaseFilter,
  Item,
} from "https://deno.land/x/ddc_vim@v3.5.0/types.ts";

type Params = {
  highlights: Record<string, string>;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    filterParams: Params,
    completeStr: string,
    items: Item[],
  }): Promise<Item[]> {
    for (const item of args.items) {
      if (item.kind) {
        item.highlights = [
          ...(item.highlights ?? []),
          {
            name: "ddc-filter-converter_kind_highlight",
            type: "kind",
            hl_group: args.filterParams.highlights[item.kind] ?? "",
            col: 1,
            width: item.kind.length,
          }
        ];
      }
    }
    return Promise.resolve(args.items);
  }

  override params(): Params {
    return {
      highlights: {}
    };
  }
}
