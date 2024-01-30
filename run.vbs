scriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

if MsgBox("Realmente dejesa iniciar o sistema de apontamento de OEE?",4,"Sistema OEE") = 6 then
  Set WshShell = CreateObject("WScript.Shell")
  WshShell.Run chr(34) & scriptDir &"/prodnote.exe" & Chr(34), 0
  Set WshShell = Nothing
  MsgBox "Sistema Iniciado com sucesso!!!", 0 ,"Sistema OEE"
end if

