<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<xsl:for-each select = "//root">

    <div class="row">
        <div class="col">
            <h1>
                <xsl:value-of select="title" />
            </h1>
            <h2>
                Ingredients
            </h2>          
        </div>
    </div>

</xsl:for-each>
</xsl:template>
</xsl:stylesheet>