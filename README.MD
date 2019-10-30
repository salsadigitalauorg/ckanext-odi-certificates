--------------------------
ckanext-odi-certificates
--------------------------

CKAN extension that will make an API call to ODI (https://certificates.theodi.org/en) to verify if the dataset has been certified and to display the Open Data Certificate badge image


------------
Installation
------------

Clone repo into the /usr/lib/ckan/default/src directory, then:

    cd ckanext-odi-certificates
    python setup.py develop


---------------
Configuration
---------------

Enable extension in CKAN .ini file, e.g.
    
    ckan.plugins = ... odi_certificates

The odi api certificate base url to search for certificates
    
    ckan.odi_certificates.certificate_base_url = https://certificates.theodi.org/en/datasets?

The odi api query parameters used to search for the certificate img. JSON object gets converted to HTML query parameters e.g. datasetUrl=https://datasetUrl&type=badge&format=png
    
    ckan.odi_certificates.certificate_img_query_parameters = {"datasetUrl":"", "format":"png", "type":"badge"}

The odi api query parameters used to for the certificate link to the ODI certificate website. JSON object gets converted to HTML query parameters e.g. datasetUrl=https://datasetUrl
    
    ckan.odi_certificates.certificate_link_query_parameters = {"datasetUrl":""}

The dataset base url of the CKAN instance
    
    ckan.odi_certificates.dataset_base_url = https://demo.ckan.org/



---------------
Examples
---------------

The API uses the dataset URL to verify if a ODI certificate exists.

If a certificate exists for the dataset being viewed, the ODI badge will be displayed beneath the main title (H1) of the dataset on the dataset detail page, with a link to the dataset's certificate details on the ODI certificates site.
    
    Dataset with ODI badge: 
        - https://training.data.qld.gov.au/dataset/youth-justice-young-offenders-in-youth-detention
        - https://certificates.theodi.org/en/datasets?datasetUrl=https%3A%2F%2Fdata.qld.gov.au%2Fdataset%2Fyouth-justice-young-offenders-in-youth-detention

If no certificate exists for the dataset being viewed, the template area allocated to display ODI certificate will be hidden
    
    Dataset without ODI badge: 
        - https://www.data.qld.gov.au/dataset/water-regulation-2002-s102-subartesian-area-mulgildie
        - https://certificates.theodi.org/en/datasets?datasetUrl=https://www.data.qld.gov.au/dataset/water-regulation-2002-s102-subartesian-area-mulgildie


