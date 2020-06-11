using System.ComponentModel;

namespace YTS.BusinessObject
{
    public enum UnitType
    {
        [Description("None")]
        NONE = 0,

        [Description("Numbers")]
        NOS = 1,

        [Description("Kilograms")]
        KGS = 2,

        [Description("Feet")]
        FT = 3,

        [Description("Meter")]
        MTR = 4,

        [Description("Pieces")]
        PCS = 5,

        [Description("Square Feet")]
        SQFT = 6,

        [Description("Inches")]
        IN = 7,

        [Description("Liters")]
        LTR = 8,

        [Description("Lots")]
        LOT = 9,

        [Description("Bags")]
        BAG = 10,

        [Description("Sets")]
        SET = 11
    }
}
