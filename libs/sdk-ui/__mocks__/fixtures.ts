// (C) 2007-2019 GoodData Corporation
import { dummyDataFacade, legacyRecordedDataFacade } from "@gooddata/sdk-backend-mockingbird";
import { IBucket, IInsight, IMeasure, newDefForBuckets } from "@gooddata/sdk-model";

import * as rec from "./recordings/playlist";

export const dummyMeasureGroup = {
    items: [
        {
            measureHeaderItem: {
                localIdentifier: "m1",
                name: "dummyName1",
                format: "#.##x",
            },
        },
        {
            measureHeaderItem: {
                localIdentifier: "m2",
                name: "dummyName2",
                format: "#.##x",
            },
        },
    ],
};
//
// new fixtures
//

export const testWorkspace = "testWorkspace";

export const emptyFacade = dummyDataFacade(newDefForBuckets(testWorkspace, []));

export const newMeasures: IMeasure[] = [
    {
        measure: {
            localIdentifier: "m1",
            title: "# Logged-in Users",
            definition: {
                measureDefinition: {
                    item: {
                        uri: "/gdc/md/myproject/obj/3276",
                    },
                    filters: [],
                },
            },
        },
    },
    {
        measure: {
            localIdentifier: "m2",
            title: "# Users Opened AD",
            definition: {
                measureDefinition: {
                    item: {
                        uri: "/gdc/md/myproject/obj/1995",
                    },
                    filters: [],
                },
            },
        },
    },
];

export const comboBuckets: IBucket[] = [
    {
        localIdentifier: "measures",
        items: newMeasures.slice(0),
    },
    {
        localIdentifier: "secondary_measures",
        items: newMeasures.slice(1),
    },
    {
        localIdentifier: "view",
        items: [
            {
                attribute: {
                    localIdentifier: "a1",
                    displayForm: {
                        uri: "/gdc/md/myproject/obj/851",
                    },
                },
            },
        ],
    },
];

export const comboFacade = dummyDataFacade(newDefForBuckets(testWorkspace, comboBuckets));

//
// Area chart fixtures
//

export const areaChartWith3MetricsAndViewByAttribute = legacyRecordedDataFacade(
    rec.AreaChartWith3MetricsAndViewByAttribute,
);

export const areaChartWithMeasureViewByAndStackBy = legacyRecordedDataFacade(
    rec.AreaChartWithMeasureViewByAndStackBy,
);

//
// Bar chart fixtures
//

export const barChartWith4MetricsAndViewByTwoAttributes = legacyRecordedDataFacade(
    rec.BarChartWith4MetricsAndViewByTwoAttributes,
);
export const barChartWithStackByAndViewByAttributes = legacyRecordedDataFacade(
    rec.BarChartWithStackByAndViewByAttributes,
);
export const barChartWithViewByAttribute = legacyRecordedDataFacade(rec.BarChartWithViewByAttribute);
export const barChartWith2MetricsAndViewByAttribute = legacyRecordedDataFacade(
    rec.BarChartWith2MetricsAndViewByAttribute,
);
export const barChartWith3MetricsAndViewByAttribute = legacyRecordedDataFacade(
    rec.BarChartWith3MetricsAndViewByAttribute,
);
export const barChartWith3MetricsAndViewByAttributeFunformat = legacyRecordedDataFacade(
    rec.BarChartWith3MetricsAndViewByAttributeFunformat,
);

export const barChartWith3MetricsAndViewByAttributePercInFormat = legacyRecordedDataFacade(
    rec.BarChartWith3MetricsAndViewByAttributePercInFormat,
);

export const barChartWithPopMeasureAndViewByAttribute = legacyRecordedDataFacade(
    rec.BarChartWithPopMeasureAndViewByAttribute,
);

export const barChartWithPopMeasureAndViewByAttributeX6 = legacyRecordedDataFacade(
    rec.BarChartWithPopMeasureAndViewByAttributeX6,
);

export const barChartWithPreviousPeriodMeasure = legacyRecordedDataFacade(
    rec.BarChartWithPreviousPeriodMeasure,
);
export const barChartWithSingleMeasureAndNoAttributes = legacyRecordedDataFacade(
    rec.BarChartWithSingleMeasureAndNoAttributes,
);
export const barChartWithStackByAndOnlyOneStack = legacyRecordedDataFacade(
    rec.BarChartWithStackByAndOnlyOneStack,
);

export const barChartWithPreviousPeriodMeasureX6 = legacyRecordedDataFacade(
    rec.BarChartWithPreviousPeriodMeasureX6,
);

export const barChartWithoutAttributes = legacyRecordedDataFacade(rec.BarChartWithoutAttributes);

export const barChartForDrillTests = legacyRecordedDataFacade(rec.BarChartForDrillTests);

//
// Bubble chart
//
export const bubbleChartWith2MetricsAndAttributeNoPrimaries = legacyRecordedDataFacade(
    rec.BubbleChartWith2MetricsAndAttributeNoPrimaries,
);

export const bubbleChartWith1Metric = legacyRecordedDataFacade(rec.BubbleChartWith1Metric);

export const bubbleChartWith3Metrics = legacyRecordedDataFacade(rec.BubbleChartWith3Metrics);

export const bubbleChartWith3MetricsAndAttribute = legacyRecordedDataFacade(
    rec.BubbleChartWith3MetricsAndAttribute,
);
export const bubbleChartWith3MetricsAndAttributeNullsInData = legacyRecordedDataFacade(
    rec.BubbleChartWith3MetricsAndAttributeNullsInData,
);

//
// Column chart
//

export const columnChartWithMeasureAndViewBy = legacyRecordedDataFacade(rec.ColumnChartWithMeasureAndViewBy);

export const columnChartWithMeasureAndViewByAndComputeRatio = legacyRecordedDataFacade(
    rec.ColumnChartWithMeasureAndViewByAndComputeRatio,
);

//
// Combo chart
//
export const comboWithTwoMeasuresAndViewByAttribute = legacyRecordedDataFacade(
    rec.ComboChartWithTwoMeasuresViewByAttribute,
);

export const comboChartWithTwoMeasuresViewByAttributeNoBuckets = legacyRecordedDataFacade(
    rec.ComboChartWithTwoMeasuresViewByAttributeNoBuckets,
);

export const comboChartWithTwoMeasuresViewByAttributePercformat = legacyRecordedDataFacade(
    rec.ComboChartWithTwoMeasuresViewByAttributePercformat,
);

export const comboChartWith3MetricsAndViewByAttribute = legacyRecordedDataFacade(
    rec.ComboChartWith3MetricsAndViewByAttribute,
);

//
//
//
export const headlineWithOneMeasure = legacyRecordedDataFacade(rec.HeadlineWithOneMeasure);
export const headlineWithOneMeasureWithIdentifier = legacyRecordedDataFacade(
    rec.HeadlineWithOneMeasureWithIdentifier,
);
export const headlineWithTwoMeasures = legacyRecordedDataFacade(rec.HeadlineWithTwoMeasures);
export const headlineWithTwoMeasuresWithIdentifier = legacyRecordedDataFacade(
    rec.HeadlineWithTwoMeasuresWithIdentifier,
);
export const headlineWithTwoMeasuresFirstEmpty = legacyRecordedDataFacade(
    rec.HeadlineWithTwoMeasuresFirstEmpty,
);
export const headlineWithTwoMeasuresSecondEmpty = legacyRecordedDataFacade(
    rec.HeadlineWithTwoMeasuresSecondEmpty,
);
export const headlineWithTwoMeasuresBothEmpty = legacyRecordedDataFacade(
    rec.HeadlineWithTwoMeasuresBothEmpty,
);
export const headlineWithTwoMeasuresBothZero = legacyRecordedDataFacade(rec.HeadlineWithTwoMeasuresBothZero);
export const headlineWithTwoMeasuresFirstZero = legacyRecordedDataFacade(
    rec.HeadlineWithTwoMeasuresFirstZero,
);
export const headlineWithTwoMeasuresSecondZero = legacyRecordedDataFacade(
    rec.HeadlineWithTwoMeasuresSecondZero,
);
export const headlineWithTwoMeasuresBothSame = legacyRecordedDataFacade(rec.HeadlineWithTwoMeasuresBothSame);

//
// Heatmap recordings
//

export const heatMapWithEmptyCells = legacyRecordedDataFacade(rec.HeatMapWithEmptyCells);
export const heatMapWithMetricRowColumn = legacyRecordedDataFacade(rec.HeatMapWithMetricRowColumn);
//
// Pie chart recordings
//

export const pieChartWithMetricsOnly = legacyRecordedDataFacade(rec.PieChartWithMetricsOnly);
export const pieChartWithMetricsOnlyFundata = legacyRecordedDataFacade(rec.PieChartWithMetricsOnlyFundata);

//
// Pivot table recordings
//
export const pivotTableWith2Metrics4AttributesSubtotals = legacyRecordedDataFacade(
    rec.PivotTableWith2Metrics4AttributesSubtotals,
);
export const pivotTableWith3Metrics = legacyRecordedDataFacade(rec.PivotTableWith3Metrics);
export const pivotTableWithColumnAndRowAttributes = legacyRecordedDataFacade(
    rec.PivotTableWithColumnAndRowAttributes,
);
export const pivotTableWithColumnRowAttributesAndTotals = legacyRecordedDataFacade(
    rec.PivotTableWithColumnRowAttributesAndTotals,
);
export const pivotTableWithSubtotals = legacyRecordedDataFacade(rec.PivotTableWithSubtotals);

//
// Scatter plot recording
//

export const scatterPlotWith2MetricsAndAttribute = legacyRecordedDataFacade(
    rec.ScatterPlotWith2MetricsAndAttribute,
);
export const scatterPlotWith2MetricsAndAttributeNullsInData = legacyRecordedDataFacade(
    rec.ScatterPlotWith2MetricsAndAttributeNullsInData,
);
export const scatterPlotWith2MetricsAndAttributeWithPrimary = legacyRecordedDataFacade(
    rec.ScatterPlotWith2MetricsAndAttributeWithPrimary,
);

//
// Treemap recordings
//

export const treemapWithMetricAndStackByAttribute = legacyRecordedDataFacade(
    rec.TreemapWithMetricAndStackByAttribute,
);
export const treemapWithMetricAndViewByAttribute = legacyRecordedDataFacade(
    rec.TreemapWithMetricAndViewByAttribute,
);
export const treemapWithTwoMetricsAndStackByAttribute = legacyRecordedDataFacade(
    rec.TreemapWithTwoMetricsAndStackByAttribute,
);
export const treemapWithThreeMetrics = legacyRecordedDataFacade(rec.TreemapWithThreeMetrics);
export const treemapWithOneMetric = legacyRecordedDataFacade(rec.TreemapWithOneMetric);
export const treemapWithMetricAndViewByAttribute1element = legacyRecordedDataFacade(
    rec.TreemapWithMetricAndViewByAttribute1element,
);
export const treemapWithMetricViewByAndStackByAttribute = legacyRecordedDataFacade(
    rec.TreemapWithMetricViewByAndStackByAttribute,
);

//
// Insights
//

export const singleMeasureInsight: IInsight = {
    insight: {
        identifier: "singleMeasureInsight",
        uri: "/some/uri/singleMeasureInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "m1",
                            title: "# Logged-in Users",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/3276",
                                    },
                                    filters: [],
                                },
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        title: "One measure",
        sorts: [],
        properties: {},
    },
};

export const singleAttributeInsight: IInsight = {
    insight: {
        identifier: "singleAttributeInsight",
        uri: "/some/uri/singleAttributeInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "attribute",
                items: [
                    {
                        attribute: {
                            localIdentifier: "a1",
                            displayForm: {
                                uri: "/gdc/md/myproject/obj/4001",
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        title: "One attribute",
        sorts: [],
        properties: {},
    },
};

export const insightWithSorts: IInsight = {
    insight: {
        identifier: "singleAttributeInsight",
        uri: "/some/uri/singleAttributeInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "m1",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/project/obj/1279",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m2",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/project/obj/1280",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            {
                localIdentifier: "view",
                items: [
                    {
                        attribute: {
                            localIdentifier: "a1",
                            displayForm: {
                                uri: "/gdc/md/project/obj/1027",
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        properties: {},
        title: "Test insight with sorts",
        sorts: [
            {
                measureSortItem: {
                    direction: "asc",
                    locators: [
                        {
                            measureLocatorItem: {
                                measureIdentifier: "m1",
                            },
                        },
                    ],
                },
            },
        ],
    },
};

export const insightWithTotals: IInsight = {
    insight: {
        identifier: "singleAttributeInsight",
        uri: "/some/uri/singleAttributeInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "m1",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/project/obj/1279",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m2",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/project/obj/1280",
                                    },
                                },
                            },
                        },
                    },
                ],
                totals: [
                    {
                        measureIdentifier: "m2",
                        type: "nat",
                        attributeIdentifier: "",
                    },
                ],
            },
        ],
        filters: [],
        properties: {},
        title: "Test insight with totals",
        sorts: [],
    },
};

export const insightWithoutTotals: IInsight = {
    insight: {
        identifier: "singleAttributeInsight",
        uri: "/some/uri/singleAttributeInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "m1",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/project/obj/1279",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m2",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/project/obj/1280",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            {
                localIdentifier: "view",
                items: [
                    {
                        attribute: {
                            localIdentifier: "a1",
                            displayForm: {
                                uri: "/gdc/md/project/obj/1027",
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        properties: {},
        title: "Test insight without totals",
        sorts: [],
    },
};

export const insightWithProperties: IInsight = {
    insight: {
        identifier: "singleAttributeInsight",
        uri: "/some/uri/singleAttributeInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "m1",
                            title: "# Logged-in Users",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/3276",
                                    },
                                    filters: [],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m2",
                            title: "# Users Opened AD",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/1995",
                                    },
                                    filters: [],
                                },
                            },
                        },
                    },
                ],
            },
            {
                localIdentifier: "view",
                items: [
                    {
                        attribute: {
                            localIdentifier: "a1",
                            displayForm: {
                                uri: "/gdc/md/myproject/obj/851",
                            },
                        },
                    },
                ],
            },
        ],
        filters: [
            {
                relativeDateFilter: {
                    from: -3,
                    to: 0,
                    granularity: "GDC.time.quarter",
                    dataSet: {
                        uri: "/gdc/md/myproject/obj/921",
                    },
                },
            },
        ],
        properties: {
            controls: {
                grid: {
                    enabled: true,
                },
            },
        },
        title: "One attribute",
        sorts: [],
    },
};

export const insightWithPoP: IInsight = {
    insight: {
        identifier: "popMeasureInsight",
        uri: "/some/uri/popMeasureInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "m1",
                            title: "# Accounts with AD Query",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/8172",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_pop",
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: "m1",
                                    popAttribute: {
                                        uri: "/gdc/md/myproject/obj/1514",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_previous_period",
                            definition: {
                                previousPeriodMeasure: {
                                    measureIdentifier: "m1",
                                    dateDataSets: [
                                        {
                                            dataSet: {
                                                uri: "/gdc/md/myproject/obj/921",
                                            },
                                            periodsAgo: 1,
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        title: "PoP measure",
        sorts: [],
        properties: {},
    },
};

export const insightWithPoPAndAlias: IInsight = {
    insight: {
        identifier: "popMeasureWithAliasInsight",
        uri: "/some/uri/popMeasureInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "m1",
                            title: "# Accounts with AD Query",
                            alias: "AD Queries",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/8172",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_pop",
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: "m1",
                                    popAttribute: {
                                        uri: "/gdc/md/myproject/obj/1514",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_previous_period",
                            definition: {
                                previousPeriodMeasure: {
                                    measureIdentifier: "m1",
                                    dateDataSets: [
                                        {
                                            dataSet: {
                                                uri: "/gdc/md/myproject/obj/921",
                                            },
                                            periodsAgo: 1,
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        title: "PoP measure with alias",
        sorts: [],
        properties: {},
    },
};

export const insightWithArithmeticAndDerivedMeasures: IInsight = {
    insight: {
        identifier: "arithmeticAndDerivedMeasureInsight",
        uri: "/some/uri/arithmeticAndDerivedMeasureInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "am1",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m1", "m1_pop"],
                                },
                            },
                            title: "ignored title",
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1",
                            title: "AD Accounts",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/8172",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_pop",
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: "m1",
                                    popAttribute: {
                                        uri: "/gdc/md/myproject/obj/1514",
                                    },
                                },
                            },
                            title: "ignored title",
                        },
                    },
                ],
            },
        ],
        filters: [],
        title: "Arithmetic and derived measures",
        sorts: [],
        properties: {},
    },
};

export const insightWithArithmeticMeasureTree: IInsight = {
    insight: {
        identifier: "arithmeticMeasureTreeInsight",
        uri: "/some/uri/arithmeticMeasureTreeInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier:
                                "arithmetic_measure_created_from_complicated_arithmetic_measures",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: [
                                        "arithmetic_measure_created_from_arithmetic_measures",
                                        "arithmetic_measure_created_from_simple_measures",
                                    ],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1",
                            title: "AD Accounts",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/8172",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m2",
                            title: "KD Accounts",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/1245",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "tree_level_2",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m1", "tree_level_1"],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "tree_level_1",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m1", "tree_level_0"],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "tree_level_0",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m1", "m2"],
                                },
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        title: "Arithmetic measure tree",
        sorts: [],
        properties: {},
    },
};

export const insightWithComplexArithmeticMeasureTree: IInsight = {
    insight: {
        identifier: "complexArithmeticMeasureTreeInsight",
        uri: "/some/uri/complexArithmeticMeasureTreeInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier:
                                "arithmetic_measure_created_from_complicated_arithmetic_measures",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: [
                                        "arithmetic_measure_created_from_arithmetic_measures",
                                        "arithmetic_measure_created_from_simple_measures",
                                    ],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1",
                            title: "# Accounts with AD Query",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/8172",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m2",
                            title: "# Accounts with KD Query",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/1245",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m3",
                            title: "# Accounts with AD Query",
                            alias: "AD Queries",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/8172",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m4",
                            title: "# Accounts with KD Query",
                            alias: "KD Queries",
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: "/gdc/md/myproject/obj/1245",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_pop",
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: "m1",
                                    popAttribute: {
                                        uri: "/gdc/md/myproject/obj/1514",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_previous_period",
                            definition: {
                                previousPeriodMeasure: {
                                    measureIdentifier: "m1",
                                    dateDataSets: [
                                        {
                                            dataSet: {
                                                uri: "/gdc/md/myproject/obj/921",
                                            },
                                            periodsAgo: 1,
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_pop_renamed",
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: "m1",
                                    popAttribute: {
                                        uri: "/gdc/md/myproject/obj/1514",
                                    },
                                },
                            },
                            alias: "Renamed SP last year M1",
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "m1_previous_period_renamed",
                            definition: {
                                previousPeriodMeasure: {
                                    measureIdentifier: "m1",
                                    dateDataSets: [
                                        {
                                            dataSet: {
                                                uri: "/gdc/md/myproject/obj/921",
                                            },
                                            periodsAgo: 1,
                                        },
                                    ],
                                },
                            },
                            alias: "Renamed previous period M1",
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "derived_measure_from_arithmetic_measure",
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: "arithmetic_measure_created_from_simple_measures",
                                    popAttribute: {
                                        uri: "/gdc/md/myproject/obj/1514",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "arithmetic_measure_created_from_simple_measures",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m1", "m2"],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "arithmetic_measure_created_from_renamed_simple_measures",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m3", "m4"],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "arithmetic_measure_created_from_derived_measures",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m1_pop", "m1_previous_period"],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "arithmetic_measure_created_from_arithmetic_measures",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: [
                                        "arithmetic_measure_created_from_renamed_simple_measures",
                                        "arithmetic_measure_created_from_renamed_derived_measures",
                                    ],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "arithmetic_measure_created_from_renamed_derived_measures",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m1_pop_renamed", "m1_previous_period_renamed"],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "invalid_arithmetic_measure_with_missing_dependency",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: ["m1", "m666"],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "invalid_arithmetic_measure_with_cyclic_dependency_1",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: [
                                        "m1",
                                        "invalid_arithmetic_measure_with_cyclic_dependency_2",
                                    ],
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "invalid_arithmetic_measure_with_cyclic_dependency_2",
                            definition: {
                                arithmeticMeasure: {
                                    operator: "sum",
                                    measureIdentifiers: [
                                        "m2",
                                        "invalid_arithmetic_measure_with_cyclic_dependency_1",
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        title: "Complex arithmetic measure tree",
        sorts: [],
        properties: {},
    },
};

export const insightWithMultipleMeasureBuckets: IInsight = {
    insight: {
        identifier: "multipleMeasureBucketsInsight",
        uri: "/some/uri/multipleMeasureBucketsInsight",
        visualizationClassUri: "testClassId",
        buckets: [
            {
                localIdentifier: "measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "fdd41e4ca6224cd2b5ecce15fdabf062",
                            format: "#,##0.00",
                            title: "Sum of Email Clicks",
                            definition: {
                                measureDefinition: {
                                    aggregation: "sum",
                                    item: {
                                        uri: "/gdc/md/yrungi0zwpoud7h1kmh6ldhp0vgkpi41/obj/15428",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            {
                localIdentifier: "secondary_measures",
                items: [
                    {
                        measure: {
                            localIdentifier: "fdd41e4ca6224cd2b5ecce15fdabf062_pop",
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: "fdd41e4ca6224cd2b5ecce15fdabf062",
                                    popAttribute: {
                                        uri: "/gdc/md/yrungi0zwpoud7h1kmh6ldhp0vgkpi41/obj/15330",
                                    },
                                },
                            },
                        },
                    },
                    {
                        measure: {
                            localIdentifier: "fdd41e4ca6224cd2b5ecce15fdabf062_previous_period",
                            definition: {
                                previousPeriodMeasure: {
                                    measureIdentifier: "fdd41e4ca6224cd2b5ecce15fdabf062",
                                    dateDataSets: [
                                        {
                                            dataSet: {
                                                uri: "/gdc/md/yrungi0zwpoud7h1kmh6ldhp0vgkpi41/obj/921",
                                            },
                                            periodsAgo: 1,
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        ],
        filters: [],
        title: "Multiple measure buckets",
        sorts: [],
        properties: {},
    },
};
