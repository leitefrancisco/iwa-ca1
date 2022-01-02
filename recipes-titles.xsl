<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<xsl:for-each select = "//recipe">

<li class="recipe-title">   
    <!-- https://stackoverflow.com/questions/10184694/how-to-create-hyperlink-using-xslt/14902493 -->
    <xsl:variable name="hyperlink"><xsl:value-of select="id" /></xsl:variable>
    <a href='#' onclick="open_recipe('{$hyperlink}');" > 
        <xsl:value-of select="title" />
    </a>
</li>

</xsl:for-each>
</xsl:template>
</xsl:stylesheet>