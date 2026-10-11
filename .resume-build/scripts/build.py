#!/usr/bin/env python3
"""Build six one-page, unpublished resume previews from shared JSON data."""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
ROOT=Path(__file__).resolve().parents[1]
def read(path): return json.loads(path.read_text(encoding="utf-8"))
profile=read(ROOT/"data/profile.json")
exp=read(ROOT/"data/experience.json")
education=read(ROOT/"data/education.json")
out=ROOT/"output";out.mkdir(exist_ok=True)
def build(path):
    d=read(path);accent=HexColor(d["accent"]);dark=HexColor("#24323C")
    def style(n,size,lead,bold=False,space=3,color=None):
        return ParagraphStyle(n,fontName="Helvetica-Bold" if bold else "Helvetica",fontSize=size,leading=lead,textColor=color or dark,spaceAfter=space)
    styles={"name":style("name",19,22,True,2),"role":style("role",11,14,True,7,accent),"contact":style("contact",8,11,False,7),"head":style("head",9.2,12,True,4,accent),"body":style("body",8.5,12,False,3),"small":style("small",7.7,10.5,False,2),"sub":style("sub",8.7,12,True,2)}
    story=[]
    def p(txt,k="body"):story.append(Paragraph(escape(txt),styles[k]))
    def head(txt):p(txt.upper(),"head")
    p(profile["name"],"name");p(d["title"],"role")
    p(profile["location"]+" | "+profile["email"]+" | LinkedIn: linkedin.com/in/brianna-dickenson-9555515b","contact")
    p("Portfolio: https://breyhanaariel.github.io/"+path.stem+"/","small")
    head("Profile");p(d["summary"])
    head("Selected skills / project technologies");p(d["skills"])
    head("Professional experience");p(exp["title"]+" | "+exp["employer"],"sub")
    p(exp["start"]+" - "+exp["end"]+" | Internship","small")
    for x in d["experience"]:p("• "+x)
    head("Independent portfolio projects")
    for x in d["projects"]:p(x["name"],"sub");p("• "+x["details"])
    head("Education & training")
    for e in education:
        if e.get("include") is False:continue
        p(e["institution"]+" — "+e["description"]+(" (completed coursework)" if e["status"]=="individual courses completed" else ""))
    def chrome(c,doc):
        c.saveState();c.setStrokeColor(accent);c.setLineWidth(2.3);c.line(43,746,569,746)
        c.setFont("Helvetica",7);c.drawRightString(569,30,"");c.restoreState()
    target=out/(path.stem+".pdf")
    SimpleDocTemplate(str(target),pagesize=letter,leftMargin=44,rightMargin=44,topMargin=53,bottomMargin=45,title=profile["name"]+" - "+d["title"]).build(story,onFirstPage=chrome,onLaterPages=chrome)
    print(target)
if __name__=="__main__":
    for f in sorted((ROOT/"data/specialties").glob("*.json")):build(f)
